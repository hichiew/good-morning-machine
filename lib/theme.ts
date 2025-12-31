// Theme system with contrasting colors for mode vs occasion buttons
export type Mode = 'default' | 'memes' | 'blindbox'

export const modeThemes = {
  default: {
    machineBg: '#FF6B6B', // Warm coral/pink
    panelBg: '#FFF8E7', // Warm off-white
    accent: '#2ECC71', // Green (complementary to coral)
    occasionBtnBg: '#FFF8E7', // Cream/off-white (neutral base)
    occasionBtnSelectedBg: '#2ECC71', // Green when selected (complementary, not machine color)
    occasionBtnText: '#1A1A1A', // Black text
    occasionBtnSelectedText: '#FFFFFF', // White text when selected
    modeBtnSelectedBg: '#FF6B6B', // Machine color when selected
    modeBtnSelectedText: '#FFFFFF', // White text
  },
  memes: {
    machineBg: '#CA1551', // deep pink
    panelBg: '#FB4D3D', // tomato red
    accent:'#FB4D3D', //tomato red
    occasionBtnBg: '#FFF8E7', // Cream/off-white (neutral base)
    occasionBtnSelectedBg: '#FB4D3D', //tomato red
    occasionBtnText: '#1A1A1A', // Black text
    occasionBtnSelectedText: '#1A1A1A', // Black text (yellow bg)
    modeBtnSelectedBg:'#CA1551', // deep pink
    modeBtnSelectedText: '#1A1A1A', // Dark text
  },
  blindbox: {
    machineBg: '#03CEA4', // teal green
    panelBg: '#FFF8E7', // Warm off-white
    accent: '#345995', // sky blue 
    occasionBtnBg: '#FFF8E7', // Cream/off-white (neutral base)
    occasionBtnSelectedBg: '#345995', // sky blue 
    occasionBtnText: '#1A1A1A', // Black text
    occasionBtnSelectedText: '#1A1A1A', // Black text (yellow bg)
    modeBtnSelectedBg: '#2C3E50', // Machine color when selected
    modeBtnSelectedText: '#FFFFFF', // White text
  },
}

export const modeLabels = {
  default: { label: 'Default', emoji: '🌼', description: 'Wholesome, sincere greetings' },
  memes: { label: 'Memes', emoji: '🗿', description: 'Ironic / internet humour' },
  blindbox: { label: 'Random', emoji: '🎰', description: 'Unpredictable, roasty, chaotic' },
}

// State enum for machine flow
export type MachineState = 'idle' | 'pulling' | 'generating' | 'readyToOpen' | 'opened'
