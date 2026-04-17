const React = require("react");

const Link = ({ href, children, className, ...props }) =>
  React.createElement("a", { href, className, ...props }, children);

Link.displayName = "NextLink";
module.exports = Link;
module.exports.default = Link;
