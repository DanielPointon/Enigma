export interface rotor {
  inputRow: string;
  outputRow: string;
  shift: number;
}
export interface machine {
  rotors: rotor[];
  reflector: string;
}

export interface rowHighlights {
  forwardPass: number[];
  backwardPass: number[];
}
export interface rotorHighlights {
  inputRow: rowHighlights;
  outputRow: rowHighlights;
}
export interface state {
  machine: machine;
  plaintext: string;
  ciphertext: string;
  highlights: rotorHighlights[];
}
