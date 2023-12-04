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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
          window.addEventListener("devicemotion", (e) => {
            // Shake sensitivity (a lower number is more)
            var sensitivity = 40;

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
          });
        }
      })
      .catch(console.error);
  } else {
    alert("DeviceMotionEvent is not defined");
  }
}
const permissionBtn = document.getElementById("permission");
permissionBtn.addEventListener("click", permission);

// Add the event listeners to the elements
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
