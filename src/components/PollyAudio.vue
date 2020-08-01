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
      audioContext: this.setup(),
      reverbSamples: [ 
        'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/ReverbSample/customReverb.wav',
        'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/ReverbSample/customReverb2.wav',
        'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/ReverbSample/customReverb3.wav',
      ],
    };
  },
  mounted: function() {
    this.playAudio();
  },
  methods: {
    setup: function() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    },
    playAudio: function() {
      const sourceUrl = 'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/notFound.mp3'
      const sourceNode = this.audioContext.createBufferSource();
      this.setupAudio(sourceUrl, sourceNode).then(sourceNode.connect(this.getReverb()));
      sourceNode.loop = true;
      sourceNode.start(0);
    },
    getReverb: function() {
      const reverbUrl = this.reverbSamples[Math.floor(Math.random() * this.sampleSize)];
      const reverbNode = this.audioContext.createConvolver();
      
      this.setupAudio(reverbUrl, reverbNode).then(reverbNode.connect(this.audioContext.destination));
      return reverbNode;
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