document.querySelectorAll('.input-cartao-number').forEach(function (input) {
  input.addEventListener('keyup', handleCartInputChange);
  input.addEventListener('change', handleCartInputChange);
});

function handleCartInputChange(event) {
  const input = event.target;

  if (input.value.length > 3) {
    const nextInput = input.nextElementSibling;
    if (nextInput) nextInput.focus();
  }

  let cardNumber = '';
  document.querySelectorAll('.input-cartao-number').forEach(function (input) {
    cardNumber += input.value + ' ';
    if (input.value.length === 4) {
      const nextInput = input.nextElementSibling;
      if (nextInput) nextInput.focus();
    }
  });

  document.querySelector('.credit-card-box .number').textContent = cardNumber.trim();
}

document.getElementById('titular').addEventListener('keyup', handleCardHolderChange);
document.getElementById('titular').addEventListener('change', handleCardHolderChange);

function handleCardHolderChange(event) {
  const input = event.target;
  document.querySelector('.credit-card-box .card-holder div').textContent = input.value;
}

document.getElementById('mes').addEventListener('change', handleExpirationChange);
document.getElementById('ano').addEventListener('change', handleExpirationChange);

function handleExpirationChange() {
  const monthSelect = document.getElementById('mes');
  const yearSelect = document.getElementById('ano');

  let monthIndex = monthSelect.selectedIndex;
  let month = monthIndex < 10 ? '0' + monthIndex : monthIndex;
  let year = yearSelect.value.slice(-2);

  document.querySelector('.card-expiration-date div').textContent = `${month}/${year}`;
}

const ccvInput = document.getElementById('ccv');

ccvInput.addEventListener('keyup', handleCCVChange);
ccvInput.addEventListener('change', handleCCVChange);

function handleCCVChange(event) {
  document.querySelector('.ccv div').textContent = event.target.value;
}

// Uncomment the following if you need credit card type detection
function getCreditCardType(accountNumber) {
  if (/^5[1-5]/.test(accountNumber)) {
    return 'mastercard';
  } else if (/^4/.test(accountNumber)) {
    return 'visa';
  } else if (/^(5018|5020|5038|6304|6759|676[1-3])/.test(accountNumber)) {
    return 'maestro';
  } else {
    return 'unknown';
  }
}