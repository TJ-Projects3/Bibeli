export type VoiceOrbState = 'idle' | 'listening' | 'speaking' | 'thinking';

export interface VoiceOrbProps {
  size: number;
  state: VoiceOrbState;
  micLevel: number; // 0-1, user's microphone input level
  outputAudioLevel: number; // 0-1, AI speech output level
}

export interface AudioWaveformProps {
  size: number;
  audioLevel: number; // 0-1, combined audio level
  isActive: boolean; // Whether waveform should be visible and animating
}
