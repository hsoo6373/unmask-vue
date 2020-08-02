<template>
    <div></div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PollyAudio',
  data: function() {
    return {
      audiosPlaying: 0,
      maxAudioPlaying: 3,
      reverbIndex: 0,
      audioContext: undefined,
      listener: undefined,
      reverbSamples: [ 
        'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/ReverbSample/customReverb.wav',
        'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/ReverbSample/customReverb2.wav',
      ],
    };
  },
  mounted: function() {
    this.setup()
    this.playAudio();
  },
  methods: {
    setup: function() {
      this.audioContext = this.createAudioCtx();
      this.listener = this.createListener();
    },
    createListener: function() {
      const listener = this.audioContext.listener;
      const posX = 0;
      const posY = 0;
      const posZ = 0;
      listener.setPosition(posX, posY, posZ);
      
      listener.forwardX.value = 0;
      listener.forwardY.value = 0;
      listener.forwardZ.value = 1;
      listener.upX.value = 0;
      listener.upY.value = -1;
      listener.upZ.value = 0;
      
      return listener;
    },
    createAudioCtx: function() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    },
    playAudio: function() {
      const sourceUrl = 'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/notFound.mp3'
      const sourceNode = this.audioContext.createBufferSource();
      this.setupAudio(sourceUrl, sourceNode).then(sourceNode.connect(this.getGain(2.5)));
      sourceNode.loop = true;
      sourceNode.start(0);
    },
    getGain: function(volume) {
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(this.getReverb());
      return gainNode;
    },
    getReverb: function() {
      const index = Math.floor(Math.random() * this.sampleSize);
      const reverbUrl = this.reverbSamples[index];
      const reverbNode = this.audioContext.createConvolver();
      
      this.setupAudio(reverbUrl, reverbNode).then(reverbNode.connect(this.getPanner()));
      return reverbNode;
    },
    getPanner: function() {
      var panner = this.audioContext.createPanner();
    
      panner.panningModel = 'HRTF';
      panner.distanceModel = 'linear';
      
      let xPos = Math.floor(Math.random() * 11) * 100;
      let yPos = Math.floor(Math.random() * 11) * 100;
      let zPos = Math.floor(Math.random() * 11) * 100;
      
      xPos *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
      yPos *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
      zPos *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
      
      console.log(xPos, yPos, zPos);
      
      panner.setPosition(xPos, yPos, zPos);
          
      panner.connect(this.audioContext.destination);
      return panner;
    },
    setupAudio: async function(url, node) {
      axios.get(url, { responseType: 'arraybuffer' }).then(response => {
        this.audioContext.decodeAudioData(response.data, audioBuffer => {
          node.buffer = audioBuffer;
        })
      });
    }
  },
  computed: {
    sampleSize: function() {
      return this.reverbSamples.length;
    },
  }
}
</script>