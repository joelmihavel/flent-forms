export const PATTERNS = {
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  PHONE: /^[6-9]\d{9}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  IFSC: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  AADHAAR: /^\d{12}$/,
  ACCOUNT_NUMBER: /^\d{9,18}$/,
};

export const COLORS = {
  primary: '#008E75',
  accent: '#FF9A6D',
  bg: '#FCFBF7',
  text: '#15102E',
  muted: '#8C8C8C',
  subtle: '#BABABA',
  border: '#e6e6e6',
  danger: '#C64747',
  warning: '#9A7A00',
  success: '#008E75',
  info: '#007A6A',
  pastelGreen: '#CFF0E9',
  pastelCyan: '#D5F7F3',
  pastelOrange: '#FFE2D8',
  pastelPink: '#FFE3EE',
  pastelRed: '#F4D7D7',
  pastelYellow: '#FFF4C3',
  pastelViolet: '#DAD7F4',
};

export const API_BASE = '/api/mock';
