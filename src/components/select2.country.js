export default function(opt) {
  if (!opt.id) {
    return opt.text;
  }
  let optimage = $(opt.element)
    .data('image');
  if (!optimage) {
    return opt.text;
  } else {
    return $(
      `<span class="countryName">
            <span class="countryFlag"><img class="rounded-circle mw-100" src="${optimage}" class="userPic" /></span>${opt.element.text()}</span>`
    );
  }
}
