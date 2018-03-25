const score = skill => {
  const arr = skill.split('');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let score = 0;
  arr.forEach(letter => {
    // If it's letter
    if (/[a-zA-Z]/.test(letter)) {
      // Position in alphabet is a key feature
      score += alphabet.indexOf(letter.toLowerCase()) + 1;
    } else if (/[0-9]/.test(letter)) {
      // This condition is obvious
      score += parseInt(letter, 10);
    } else {
      // It's a supa dupa sign = better performance
      score += 30;
    }
  });
  score = score / skill.length;
  if (skill.length === 1) {
    // One letter ? Really ? This technology is not reliable.
    score += -1;
  }
  if (skill.length === 2) {
    // Two letters ? Almost a standard.
    score += +1;
  }
  if (skill.length > 2) {
    // Ok nice, we score that.
    score += skill.length % 4;
  }
  return score;
};

export default score;
