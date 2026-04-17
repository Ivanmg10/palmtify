const React = require("react");

const createIcon = (name) => {
  const Icon = ({ className, stroke, size, ...props }) =>
    React.createElement("svg", { "data-testid": name, className, ...props });
  Icon.displayName = name;
  return Icon;
};

const handler = {
  get(_, prop) {
    return createIcon(prop);
  },
};

module.exports = new Proxy({}, handler);
