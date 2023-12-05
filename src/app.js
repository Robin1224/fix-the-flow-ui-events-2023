var Matter = require("matter-js");
var engineExists = false;

const addListenerToElement = (
  type,
  elementIndex,
  classOrHandler,
  blockAnimationEnd
) => {
  // Find the anchor element with the given index
  const el = document.querySelector(`a:nth-of-type(${elementIndex})`);

  // Add a hint listener to the element
  addHintListener(elementIndex, type, classOrHandler);

  // If the event is mouseenter or mouseleave, it will interfere with the hint event listener
  if (type === "mouseenter" || type === "mouseleave") {
    // Because this edge case is already handled by the hint listener, simply do nothing else
    return;

    // If there is no edge case, add the event listener
  } else {
    // First, check if the given argument is a class name or a function
    if (typeof classOrHandler === "function") {
      // If the argument is a function, add the event listener to the element with the provided handler
      el.addEventListener(type, classOrHandler);

      // Only add the animation end listener if the blockAnimationEnd argument is false
      if (!blockAnimationEnd) {
        // Run the handler on animation end to remove the class name
        el.addEventListener("animationend", classOrHandler);
      }

      // Log the event listener
      fancyListenerLog(elementIndex, type, classOrHandler);
    }
    // If it's not a function, make sure it's a valid string
    else if (typeof classOrHandler === "string") {
      // If the argument is a string, add a function to toggle said string as a class name
      el.addEventListener(type, () => {
        el.classList.toggle(classOrHandler);
      });

      // Only add the animation end listener if the blockAnimationEnd argument is false
      if (!blockAnimationEnd) {
        // Run the handler on animation end to remove the class name
        el.addEventListener("animationend", () => {
          el.classList.toggle(classOrHandler);
        });
      }

      // Log the event listener
      fancyListenerLog(elementIndex, type, classOrHandler);
    }
  }
};

const addHintListener = (elementIndex, type, className) => {
  const el = document.querySelector(`a:nth-of-type(${elementIndex})`);
  const elHint = document.getElementById("event-hint");

  // If the event is mouseenter, overwrite it, but make sure to add the original handler
  if (type === "mouseenter") {
    el.addEventListener("mouseenter", () => {
      el.classList.toggle(className);
      elHint.textContent = type;
    });

    el.addEventListener("mouseleave", () => {
      elHint.textContent =
        "Hover over een knop om te zien welk event er aan gekoppeld is";
    });

    // Remove the class name when the animation ends
    el.addEventListener("animationend", () => {
      el.classList.toggle(className);
    });

    // Log the event listener
    fancyListenerLog(elementIndex, type, className);

    // If the event is mouseleave, overwrite it, but make sure to add the original handler
  } else if (type === "mouseleave") {
    el.addEventListener("mouseenter", () => {
      elHint.textContent = type;
    });

    el.addEventListener("mouseleave", () => {
      elHint.textContent =
        "Hover over een knop om te zien welk event er aan gekoppeld is";
      el.classList.toggle(className);
    });

    // Remove the class name when the animation ends
    el.addEventListener("animationend", () => {
      el.classList.toggle(className);
    });

    // Log the event listener
    fancyListenerLog(elementIndex, type, className);

    // If it's not an edgecase, simply add the hint listeners
  } else {
    el.addEventListener("mouseenter", () => {
      elHint.textContent = type;
    });

    el.addEventListener("mouseleave", () => {
      elHint.textContent =
        "Hover over een knop om te zien welk event er aan gekoppeld is";
    });
  }
};

const shakeListener = () => {
  // Shake sensitivity (a lower number is more)
  var sensitivity = 400;

  // Position variables
  var x1 = 0,
    y1 = 0,
    z1 = 0,
    x2 = 0,
    y2 = 0,
    z2 = 0;

  // Listen to motion events and update the position
  window.addEventListener(
    "devicemotion",
    function (e) {
      x1 = e.accelerationIncludingGravity.x;
      y1 = e.accelerationIncludingGravity.y;
      z1 = e.accelerationIncludingGravity.z;
    },
    false
  );

  // Periodically check the position and fire
  // if the change is greater than the sensitivity
  setInterval(function () {
    var change = Math.abs(x1 - x2 + y1 - y2 + z1 - z2);

    if (change > sensitivity) {
      alert("Shake!");
    }

    // Update new position
    x2 = x1;
    y2 = y1;
    z2 = z1;
  }, 150);
};

const fancyListenerLog = (element, type, stringOrHandler) => {
  // Create style strings for the log message
  const styles = [
    // plus sign:
    "color: #fff; background-color: #1e8016; font-weight: bold; font-size: 1.2em;",
    // first line:
    "color: #fff; background-color: transparent; font-size: 1.2em;",
    // property names:
    "color: #fff; background-color: #transparent; font-size: 1em;",
    // element index:
    "color: #fff; background-color: #176c75; font-weight: bold; font-size: 1em;",
    // event type:
    "color: #fff; background-color: #b00026; font-weight: bold; font-size: 1em;",
    // class:
    "color: #fff; background-color: #4c00b0; font-weight: bold; font-size: 1em;",
    // function:
    "color: #fff; background-color: #7d5d06; font-weight: bold; font-size: 1em;",
  ];

  if (typeof stringOrHandler === "function") {
    console.log(
      `%c + %c Added event listener\n\n%c- Element: %c ${element} %c\n- Type:    %c ${type} %c\n- Handler: %c ${stringOrHandler.name} %c`,

      // First line
      styles[0],
      styles[1],

      // Second line
      styles[2],
      styles[3],

      // Third line
      styles[2],
      styles[4],

      // Fourth line
      styles[2],
      styles[6],

      // Clear
      styles[1]
    );
  } else {
    console.log(
      `%c + %c Added event listener\n\n%c- Element: %c ${element} %c\n- Type:    %c ${type} %c\n- Class:   %c ${stringOrHandler} %c`,

      // First line
      styles[0],
      styles[1],

      // Second line
      styles[2],
      styles[3],

      // Third line
      styles[2],
      styles[4],

      // Fourth line
      styles[2],
      styles[5],

      // Clear
      styles[1]
    );
  }
};

function permission() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    // (optional) Do something before API request prompt.
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        // (optional) Do something after API prompt dismissed.
        if (response == "granted") {
          shakeListener();
        }
      })
      .catch(console.error);
  } else {
    alert("DeviceMotionEvent is not defined");
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const createMatterEngine = () => {
  // module aliases
  var Engine = Matter.Engine;
  var Render = Matter.Render;
  var Runner = Matter.Runner;
  var Bodies = Matter.Bodies;
  var Composite = Matter.Composite;

  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
      height: window.innerHeight,
      width: window.innerWidth,
      pixelRatio: 1,
      background: "#050840",
    },
  });

  // create objects
  var eventText = createObjectFromSelector("header>h1", "event-text");
  var eventDescription = createObjectFromSelector("header>span", "event-description");

  var frontend = createObjectFromSelector("a:nth-of-type(1)", "frontend");
  var design = createObjectFromSelector("a:nth-of-type(2)", "design");
  var and = createObjectFromSelector("a:nth-of-type(3)", "and");
  var development = createObjectFromSelector("a:nth-of-type(4)", "development");
  var sprint5 = createObjectFromSelector("a:nth-of-type(5)", "sprint-5");
  var fix = createObjectFromSelector("a:nth-of-type(6)", "fix");
  var the = createObjectFromSelector("a:nth-of-type(7)", "the");
  var flow = createObjectFromSelector("a:nth-of-type(8)", "flow");
  var user = createObjectFromSelector("a:nth-of-type(9)", "user");
  var interface = createObjectFromSelector("a:nth-of-type(10)", "interface");
  var events = createObjectFromSelector("a:nth-of-type(11)", "events");
  var interaction = createObjectFromSelector("a:nth-of-type(12)", "interaction");
  var userFlow = createObjectFromSelector("a:nth-of-type(13)", "user-flow");
  var wireflow = createObjectFromSelector("a:nth-of-type(14)", "wireflow");
  var feedback = createObjectFromSelector("a:nth-of-type(15)", "feedback");
  var feedforward = createObjectFromSelector("a:nth-of-type(16)", "feedforward");
  var labels = createObjectFromSelector("a:nth-of-type(17)", "labels");
  var states = createObjectFromSelector("a:nth-of-type(18)", "states");
  var navigation = createObjectFromSelector("a:nth-of-type(19)", "navigation");
  var code = createObjectFromSelector("a:nth-of-type(20)", "code");

  // var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // add all of the bodies to the world
  Composite.add(engine.world, [
    eventText,
    eventDescription,
    frontend, 
    design, 
    and,
    development,
    sprint5,
    fix, 
    the,
    flow,
    user,
    interface,
    events,
    interaction,
    userFlow,
    wireflow,
    feedback,
    feedforward,
    labels,
    states,
    navigation,
    code,
    ground]);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);

  // Let future functions know that the engine exists
  engineExists = true;
};

const createObjectFromSelector = (selector, spriteName) => {
  const el = document.querySelector(selector);
  var { x, y, width, height } = el.getBoundingClientRect();

  x += width / 2;
  y += height / 2;

  const object = Matter.Bodies.rectangle(x, y, width, height, {
    render: {
      sprite: {
        texture: `assets/sprites/${spriteName}.png`,
        xScale: 0.5,
        yScale: 0.5,
      },
    },
  });

  return object;
};

// Event handlers
const mouseMoveHandler = async (e) => {
  if (e.srcElement.classList.contains("red")) {
    return;
  } else {
    e.srcElement.classList.toggle("red");
    await sleep(500);
    e.srcElement.classList.toggle("red");
  }
};

const dragHandler = async (e) => {
  if (e.srcElement.classList.contains("grow-vertical")) {
    return;
  } else {
    e.srcElement.classList.toggle("grow-vertical");
    await sleep(500);
    e.srcElement.classList.toggle("grow-vertical");
  }
};

const permissionBtn = document.getElementById("permission");
permissionBtn.addEventListener("click", permission);

// Add the event listeners to the elements
console.groupCollapsed("Event listeners");

addListenerToElement("mousedown", 1, "horizontal-shake");
addListenerToElement("mouseup", 2, "vertical-shake");
addListenerToElement("mouseleave", 3, "rotational-shake");
addListenerToElement("mouseenter", 4, "grow");
addListenerToElement("mousemove", 5, mouseMoveHandler, true);
addListenerToElement("drag", 6, dragHandler, true);
addListenerToElement("dragend", 7, "grow-horizontal");
addListenerToElement("cut", 8, "shrink-horizontal");
addListenerToElement("copy", 9, "shrink-vertical");
addListenerToElement("paste", 10, "jump");

addListenerToElement("click", 12, "jump");

console.groupEnd();

document.getElementById("test-button").addEventListener("click", () => {
  if (!engineExists) {
    document.querySelector("header>span").textContent = "Shake!";
    createMatterEngine();
  }
  sleep(100).then(() => {
    document.querySelectorAll("header, section, h2, #permission").forEach((el) => {
      el.classList.toggle("hidden", true);
    });
  })
});