'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file webpack-concat-plugin
 * @author huangxueliang
 */
var fs = require('fs');
var Concat = require('concat-with-sourcemaps');
var UglifyJS = require('uglify-es');
var createHash = require('crypto').createHash;
var path = require('path');
var upath = require('upath');
var globby = require('globby');
var validateOptions = require('schema-utils');
var schema = require('./schema.json');

var ConcatPlugin = function () {
    function ConcatPlugin(options) {
        _classCallCheck(this, ConcatPlugin);

        options = Object.assign({
            uglify: false,
            sourceMap: false,
            fileName: '[name].js',
            name: 'result',
            injectType: 'prepend',
            outputPath: ''
        }, options);

        if (!options.filesToConcat || !options.filesToConcat.length) {
            throw new Error('webpackConcatPlugin: option filesToConcat is required and should not be empty');
        }

        validateOptions(schema, options, 'webpackConcatPlugin');

        options.outputPath = options.outputPath && this.ensureTrailingSlash(options.outputPath);

        this.settings = options;

        // used to determine if we should emit files during compiler emit event
        this.startTime = Date.now();
        this.prevTimestamps = {};
        this.needCreateNewFile = true;
    }

    _createClass(ConcatPlugin, [{
        key: 'ensureTrailingSlash',
        value: function ensureTrailingSlash(string) {
            if (string.length && string.substr(-1, 1) !== '/') {
                return `${string}/`;
            }

            return string;
        }
    }, {
        key: 'getFileName',
        value: function getFileName(files) {
            var filePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.settings.fileName;

            if (!this.needCreateNewFile) {
                return this.finalFileName;
            }

            var fileRegExp = /\[name\]/;
            var hashRegExp = /\[hash(?:(?::)([\d]+))?\]/;

            if (this.settings.useHash || hashRegExp.test(filePath)) {
                var fileHash = this.hashFile(files);

                if (!hashRegExp.test(filePath)) {
                    filePath = filePath.replace(/\.js$/, '.[hash].js');
                }

                var regResult = hashRegExp.exec(filePath);
                var hashLength = regResult[1] ? Number(regResult[1]) : fileHash.length;

                filePath = filePath.replace(hashRegExp, fileHash.slice(0, hashLength));
            }
            return filePath.replace(fileRegExp, this.settings.name);
        }
    }, {
        key: 'hashFile',
        value: function hashFile(files) {
            if (this.fileHash && !this.needCreateNewFile) {
                return this.fileHash;
            }
            var content = Object.keys(files).reduce(function (fileContent, fileName) {
                return fileContent + files[fileName];
            }, '');

            var _settings = this.settings,
                _settings$hashFunctio = _settings.hashFunction,
                hashFunction = _settings$hashFunctio === undefined ? 'md5' : _settings$hashFunctio,
                _settings$hashDigest = _settings.hashDigest,
                hashDigest = _settings$hashDigest === undefined ? 'hex' : _settings$hashDigest;

            this.fileHash = createHash(hashFunction).update(content).digest(hashDigest);
            if (hashDigest === 'base64') {
                // these are not safe url characters.
                this.fileHash = this.fileHash.replace(/[/+=]/g, function (c) {
                    switch (c) {
                        case '/':
                            return '_';
                        case '+':
                            return '-';
                        case '=':
                            return '';
                        default:
                            return c;
                    }
                });
            }

            return this.fileHash;
        }
    }, {
        key: 'getRelativePathAsync',
        value: function getRelativePathAsync(context) {
            return Promise.all(this.settings.filesToConcat.map(function (f) {
                if (globby.hasMagic(f)) {
                    return globby(f, {
                        cwd: context,
                        nodir: true
                    });
                }
                return f;
            })).then(function (rawResult) {
                return rawResult.reduce(function (target, resource) {
                    return target.concat(resource);
                }, []);
            }).catch(function (e) {
                console.error(e);
            });
        }
    }, {
        key: 'resolveReadFiles',
        value: function resolveReadFiles(compiler) {
            var _this = this;

            var self = this;
            var readFilePromise = void 0;

            var relativePathArrayPromise = this.getRelativePathAsync(compiler.options.context);

            this.filesToConcatAbsolutePromise = new Promise(function (resolve, reject) {
                compiler.resolverFactory.plugin('resolver normal', function (resolver) {
                    resolve(relativePathArrayPromise.then(function (relativeFilePathArray) {
                        return Promise.all(relativeFilePathArray.map(function (relativeFilePath) {
                            return new Promise(function (resolve, reject) {
                                return resolver.resolve({}, compiler.options.context, relativeFilePath, {}, function (err, filePath) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(filePath);
                                    }
                                });
                            });
                        }));
                    }).catch(function (e) {
                        console.error(e);
                    }));
                });
            });

            var createNewPromise = function createNewPromise() {
                self.needCreateNewFile = true;

                return _this.filesToConcatAbsolutePromise.then(function (filePathArray) {
                    return Promise.all(filePathArray.map(function (filePath) {
                        return new Promise(function (resolve, reject) {
                            fs.readFile(filePath, function (err, data) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({
                                        ['webpack:///' + upath.relative(compiler.options.context, filePath)]: data.toString()
                                    });
                                }
                            });
                        });
                    }));
                }).catch(function (e) {
                    console.error(e);
                });
            };

            this.getReadFilePromise = function (createNew) {
                if (!readFilePromise || createNew) {
                    readFilePromise = createNewPromise();
                }
                return readFilePromise;
            };
        }
    }, {
        key: 'resolveConcatAndUglify',
        value: function resolveConcatAndUglify(compilation, files) {
            var allFiles = files.reduce(function (file1, file2) {
                return Object.assign(file1, file2);
            }, {});
            var content = '';
            var mapContent = '';

            this.finalFileName = this.getFileName(allFiles);
            var fileBaseName = path.basename(this.finalFileName);

            if (this.settings.uglify) {
                var options = {};

                if (typeof this.settings.uglify === 'object') {
                    options = Object.assign({}, this.settings.uglify, options);
                }

                if (this.settings.sourceMap) {
                    options.sourceMap = {
                        url: `${fileBaseName}.map`,
                        includeSources: true
                    };
                }

                var result = UglifyJS.minify(allFiles, options);

                if (result.error) {
                    throw result.error;
                }

                content = result.code;

                if (this.settings.sourceMap) {
                    mapContent = result.map.toString();
                }
            } else {
                var concat = new Concat(!!this.settings.sourceMap, this.finalFileName, '\n');

                Object.keys(allFiles).forEach(function (fileName) {
                    concat.add(fileName, allFiles[fileName]);
                });

                content = concat.content.toString();

                if (this.settings.sourceMap) {
                    content += `//# sourceMappingURL=${fileBaseName}.map`;
                    mapContent = concat.sourceMap;
                }
            }

            compilation.assets[`${this.settings.outputPath}${this.finalFileName}`] = {
                source() {
                    return content;
                },
                size() {
                    return content.length;
                }
            };

            compilation.hooks.moduleAsset.call({
                userRequest: `${this.settings.outputPath}${this.settings.name}.js`
            }, `${this.settings.outputPath}${this.finalFileName}`);

            if (this.settings.sourceMap) {
                compilation.assets[`${this.settings.outputPath}${this.finalFileName}.map`] = {
                    source() {
                        return mapContent;
                    },
                    size() {
                        return mapContent.length;
                    }
                };
                compilation.hooks.moduleAsset.call({
                    userRequest: `${this.settings.outputPath}${this.settings.name}.js.map`
                }, `${this.settings.outputPath}${this.finalFileName}.map`);
            }

            this.needCreateNewFile = false;
        }
    }, {
        key: 'apply',
        value: function apply(compiler) {
            var _this2 = this;

            // ensure only compile one time per emit
            var compileLoopStarted = false;

            this.resolveReadFiles(compiler);

            var self = this;

            var dependenciesChanged = function dependenciesChanged(compilation, filesToConcatAbsolute) {
                var fileTimestampsKeys = Object.keys(compilation.fileTimestamps);
                // Since there are no time stamps, assume this is the first run and emit files
                if (!fileTimestampsKeys.length) {
                    return true;
                }
                var changed = fileTimestampsKeys.filter(function (watchfile) {
                    return (self.prevTimestamps[watchfile] || self.startTime) < (compilation.fileTimestamps[watchfile] || Infinity);
                }).some(function (f) {
                    return filesToConcatAbsolute.includes(f);
                });
                _this2.prevTimestamps = compilation.fileTimestamps;
                return changed;
            };

            var processCompiling = function processCompiling(compilation, callback) {
                self.filesToConcatAbsolutePromise.then(function (filesToConcatAbsolute) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = filesToConcatAbsolute[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var f = _step.value;

                            compilation.fileDependencies.add(path.relative(compiler.options.context, f));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    if (!dependenciesChanged(compilation, filesToConcatAbsolute)) {
                        return callback();
                    }
                    return self.getReadFilePromise(true).then(function (files) {
                        self.resolveConcatAndUglify(compilation, files);

                        callback();
                    });
                }).catch(function (e) {
                    console.error(e);
                });
            };

            compiler.hooks.compilation.tap('webpackConcatPlugin', function (compilation) {
                var assetPath = void 0;

                compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration && compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('webpackConcatPlugin', function (htmlPluginData, callback) {
                    var getAssetPath = function getAssetPath() {
                        if (typeof self.settings.publicPath === 'undefined') {
                            if (typeof compilation.options.output.publicPath === 'undefined') {
                                return path.relative(path.dirname(htmlPluginData.outputName), `${self.settings.outputPath}${self.finalFileName}`);
                            }
                            return `${self.ensureTrailingSlash(compilation.options.output.publicPath)}${self.settings.outputPath}${self.finalFileName}`;
                        }
                        if (self.settings.publicPath === false) {
                            return path.relative(path.dirname(htmlPluginData.outputName), `${self.settings.outputPath}${self.finalFileName}`);
                        }
                        return `${self.ensureTrailingSlash(self.settings.publicPath)}${self.settings.outputPath}${self.finalFileName}`;
                    };

                    var injectToHtml = function injectToHtml() {
                        htmlPluginData.assets.webpackConcat = htmlPluginData.assets.webpackConcat || {};

                        assetPath = getAssetPath();

                        htmlPluginData.assets.webpackConcat[self.settings.name] = assetPath;

                        if (self.settings.injectType === 'prepend') {
                            htmlPluginData.assets.js.unshift(assetPath);
                        } else if (self.settings.injectType === 'append') {
                            htmlPluginData.assets.js.push(assetPath);
                        }
                    };

                    if (!self.finalFileName || !compileLoopStarted) {
                        compileLoopStarted = true;
                        processCompiling(compilation, function () {
                            injectToHtml();
                            callback(null, htmlPluginData);
                        });
                    } else {
                        injectToHtml();
                        callback(null, htmlPluginData);
                    }
                });

                compilation.hooks.htmlWebpackPluginAlterAssetTags && compilation.hooks.htmlWebpackPluginAlterAssetTags.tap('webpackConcatPlugin', function (htmlPluginData) {
                    if (self.settings.injectType !== 'none') {
                        var tags = htmlPluginData.head.concat(htmlPluginData.body);
                        var resultTag = tags.filter(function (tag) {
                            return tag.attributes.src === assetPath;
                        });
                        if (resultTag && resultTag.length && self.settings.attributes) {
                            Object.assign(resultTag[0].attributes, self.settings.attributes);
                        }
                    }
                });
            });

            compiler.hooks.emit.tapAsync('webpackConcatPlugin', function (compilation, callback) {
                if (!compileLoopStarted) {
                    compileLoopStarted = true;
                    processCompiling(compilation, callback);
                } else {
                    callback();
                }
            });
            compiler.hooks.afterEmit.tap('webpackConcatPlugin', function (compilation) {
                compileLoopStarted = false;
            });
        }
    }]);

    return ConcatPlugin;
}();

module.exports = ConcatPlugin;
