prefixValidator = input => input.replace(/[^a-z0-9!#$%&'*+-/=?^_`{|}~]/gi, '');
firstname = prefixValidator('guillaume');
lastname = prefixValidator('bonhommeau');
domain = 'gmail.com';
emails = [];
'!#$%&*+-/=?^_`{|}~'.split('').forEach((symbol) => {
  emails.push(`${firstname}${symbol}${lastname}@${domain}`);
  emails.push(`${lastname}${symbol}${firstname}@${domain}`);
  emails.push(`${firstname.charAt(0)}${symbol}${lastname}@${domain}`);
  emails.push(`${lastname}${symbol}${firstname.charAt(0)}@${domain}`);
});
window.open().document.write(emails.map((e) => `${firstname},${lastname},${domain},${e}`).join('<br />'));