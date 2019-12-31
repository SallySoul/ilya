// Originally from electron-react-boilerplate

const { src, dest } = require('gulp');

function copyHtml() {
  return src('app/index.html').pipe(dest('build'));
}

copyHtml.displayName = 'copy-html';

exports.copyHtml = copyHtml;
