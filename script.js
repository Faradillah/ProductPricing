function calculate() {
  const cogs = parseFloat(document.getElementById('cogs').value) || 0;
  const additional = parseFloat(document.getElementById('additional').value) || 0;
  const markup = parseFloat(document.getElementById('markup').value) || 0;
  const discount = parseFloat(document.getElementById('discount').value) || 0;
  const includeFee = document.getElementById('fee-toggle').checked;
  const feeRate = includeFee ? (parseFloat(document.getElementById('fee').value) || 0) : 0;

  let baseCost = cogs + additional;
  let sellingPrice = baseCost * (1 + markup / 100);
  if (feeRate > 0) {
    sellingPrice *= (1 + feeRate / 100);
  }
  if (discount > 0) {
    sellingPrice *= (1 - discount / 100);
  }
  const profit = sellingPrice - baseCost;
  const margin = baseCost > 0 ? (profit / sellingPrice) * 100 : 0;

  document.getElementById('selling-price').innerText = sellingPrice.toFixed(2);
  document.getElementById('gross-profit').innerText = profit.toFixed(2);
  document.getElementById('gross-margin').innerText = margin.toFixed(2) + '%';
}

document.querySelectorAll('input').forEach(el => {
  el.addEventListener('input', calculate);
});

document.getElementById('fee-toggle').addEventListener('change', () => {
  document.getElementById('fee-section').style.display = document.getElementById('fee-toggle').checked ? 'block' : 'none';
  calculate();
});

calculate();
