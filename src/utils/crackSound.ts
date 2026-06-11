let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }
  return audioCtx;
}

export function playCrackSound(tapNumber: number, isFinal: boolean): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = isFinal ? 0.28 : 0.1;

    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp(-i / (bufferSize * (isFinal ? 0.12 : 0.2)));
      data[i] = (Math.random() * 2 - 1) * decay;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = isFinal ? 900 : 1600 + tapNumber * 150;
    filter.Q.value = isFinal ? 1.2 : 0.9;

    const gain = ctx.createGain();
    const volume = isFinal ? 0.55 : 0.28 + tapNumber * 0.04;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration);

    const click = ctx.createOscillator();
    click.type = 'triangle';
    click.frequency.setValueAtTime(isFinal ? 140 : 280 + tapNumber * 40, now);
    click.frequency.exponentialRampToValueAtTime(60, now + 0.035);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(isFinal ? 0.2 : 0.1, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    click.connect(clickGain);
    clickGain.connect(ctx.destination);
    click.start(now);
    click.stop(now + 0.05);
  } catch {
    // Audio may be unavailable or blocked
  }
}
