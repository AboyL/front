先将jsx转成 createElement的形式，再通过createElement产生vdom，再通过vdom产生真实的dom


```jsx
"use strict";

const App = /*#__PURE__*/React.createElement("div", {
  className: "app",
  style: {
    color: 'red'
  }
}, /*#__PURE__*/React.createElement("div", null, "div1"), "hhhhh", /*#__PURE__*/React.createElement("div", null, "div2"));


{
    "type": "div",
    "key": null,
    "ref": null,
    "props": {
        "className": "app",
        "style": {
            "color": "red"
        },
        "children": [
            {
                "type": "div",
                "key": null,
                "ref": null,
                "props": {
                    "children": "div1"
                },
                "_owner": null,
                "_store": {}
            },
            "hhhhh",
            {
                "type": "div",
                "key": null,
                "ref": null,
                "props": {
                    "children": "div2"
                },
                "_owner": null,
                "_store": {}
            }
        ]
    },
    "_owner": null,
    "_store": {}
}
```

只有一个子元素

```jsx

{
    "type": "div",
    "key": null,
    "ref": null,
    "props": {
        "className": "app",
        "style": {
            "color": "red"
        },
        "children": {
            "type": "div",
            "key": null,
            "ref": null,
            "props": {
                "children": "div1"
            },
            "_owner": null,
            "_store": {}
        }
    },
    "_owner": null,
    "_store": {}
}

```