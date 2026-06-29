import { useEffect, useState } from 'react';

export interface KeyMap {
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  jump: boolean;
}

export const useKeyboard = () => {
  const [keys, setKeys] = useState<KeyMap>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key: keyof KeyMap | null = null;
      
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          key = 'moveForward';
          break;
        case 's':
        case 'arrowdown':
          key = 'moveBackward';
          break;
        case 'a':
        case 'arrowleft':
          key = 'moveLeft';
          break;
        case 'd':
        case 'arrowright':
          key = 'moveRight';
          break;
        case ' ':
          key = 'jump';
          break;
      }

      if (key) {
        setKeys((prev) => ({ ...prev, [key as string]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      let key: keyof KeyMap | null = null;

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          key = 'moveForward';
          break;
        case 's':
        case 'arrowdown':
          key = 'moveBackward';
          break;
        case 'a':
        case 'arrowleft':
          key = 'moveLeft';
          break;
        case 'd':
        case 'arrowright':
          key = 'moveRight';
          break;
        case ' ':
          key = 'jump';
          break;
      }

      if (key) {
        setKeys((prev) => ({ ...prev, [key as string]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};
