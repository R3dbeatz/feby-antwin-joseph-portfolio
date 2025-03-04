
/**
 * Utility functions for text animation effects
 */

/**
 * Shuffles text while preserving spaces and revealed characters
 */
export const scrambleText = (
  originalText: string, 
  revealedIndices: Set<number>, 
  characters: string,
  useOriginalCharsOnly: boolean
): string => {
  if (useOriginalCharsOnly) {
    return shuffleWithOriginalCharsOnly(originalText, revealedIndices);
  } else {
    return shuffleWithAnyChars(originalText, revealedIndices, characters);
  }
};

/**
 * Shuffles text using only the characters from the original text
 */
const shuffleWithOriginalCharsOnly = (
  originalText: string, 
  revealedIndices: Set<number>
): string => {
  const positions = originalText.split('').map((char, i) => ({
    char,
    isSpace: char === ' ',
    index: i,
    isRevealed: revealedIndices.has(i),
  }));

  const nonSpaceChars = positions
    .filter((p) => !p.isSpace && !p.isRevealed)
    .map((p) => p.char);

  // Fisher-Yates shuffle
  for (let i = nonSpaceChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
  }

  let charIndex = 0;
  return positions
    .map((p) => {
      if (p.isSpace) return ' ';
      if (p.isRevealed) return originalText[p.index];
      return nonSpaceChars[charIndex++];
    })
    .join('');
};

/**
 * Shuffles text using any characters from the provided character set
 */
const shuffleWithAnyChars = (
  originalText: string, 
  revealedIndices: Set<number>, 
  characters: string
): string => {
  const availableChars = characters.split('');
  
  return originalText
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (revealedIndices.has(i)) return originalText[i];
      return availableChars[Math.floor(Math.random() * availableChars.length)];
    })
    .join('');
};

/**
 * Determines the next character index to reveal based on the reveal direction
 */
export const getNextRevealIndex = (
  text: string,
  revealedSet: Set<number>,
  revealDirection: 'start' | 'end' | 'center'
): number => {
  const textLength = text.length;
  
  switch (revealDirection) {
    case 'start':
      return revealedSet.size;
      
    case 'end':
      return textLength - 1 - revealedSet.size;
      
    case 'center': {
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealedSet.size / 2);
      const nextIndex = revealedSet.size % 2 === 0
        ? middle + offset
        : middle - offset - 1;

      if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
        return nextIndex;
      }
      
      // Fallback: find first unrevealed index
      for (let i = 0; i < textLength; i++) {
        if (!revealedSet.has(i)) return i;
      }
      return 0;
    }
    
    default:
      return revealedSet.size;
  }
};
