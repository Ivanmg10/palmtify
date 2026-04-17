const React = require("react");

const Image = ({ src, alt, width, height, className, fill, style, ...props }) =>
  React.createElement("img", {
    src: typeof src === "object" ? src.src || "test-file-stub" : src,
    alt,
    width,
    height,
    className,
    style,
    ...props,
  });

Image.displayName = "NextImage";
module.exports = Image;
module.exports.default = Image;
