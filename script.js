const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
// Define animation data for visualizing call stack or other animations
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 5000,
    removeElDelay: 10000
  }
];

const decimalToBinary = (input) => {
  // Check if input is 0 or 1, which are the base cases
  if (input === 0 || input === 1) {
    return String(input); // Convert input to a string and return it
  } else {
    // Recursive call to decimalToBinary, halving the input
    // and concatenating the remainder of input divided by 2 to the result
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

// Function to display animation based on predefined data
const showAnimation = () => {
  // Set initial text to indicate what is being shown
  result.innerText = "Call Stack Animation";

  // Process each object in the animation data array
  animationData.forEach((obj) => {
    // Delay the display of each element based on specified delay
    setTimeout(() => {
      // Add paragraph elements with specified styles and contents dynamically
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);
  if (!numberInput.value || isNaN(inputInt)) {
    alert("Please provide a decimal number");
    return;
  }
  if (inputInt === 5) {
    showAnimation();
    return;
  }
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});