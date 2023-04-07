<template>
  <draggable style="display: flex; flex-direction: row; gap: 1em; justify-content: center;" v-model="candidates"
    :group="{ name: 'beats', pull: 'clone', put: false }"
    :clone="(e) => { state.draggingRhythm = e; return cloneDeep(e); }" ghost-class="ghost" :move="handleMove"
    item-key="id">
    <template #item="{ index, element }">
      <div :key="index" style="width: 96px">
        <img :src="svgs[element.svg]" />
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { beats, svgs } from '../constants';
import { state } from '../globals';
import { cloneDeep } from 'lodash';
import { dragToLengthCheck } from '../utils';
import { ref } from 'vue';
import { Rhythm } from '../types';

const handleMove = (e) => dragToLengthCheck(e);

const candidates = ref<Rhythm[]>([
  {
    beats: [beats.quarterPiano],
    svg: 'quarter-note'
  },
  {
    beats: [beats.quarterRest],
    svg: 'quarter-rest'
  },
  {
    beats: [beats.eighthPiano, beats.eighthPiano],
    svg: 'double-eighth-note'
  },
  {
    beats: [beats.halfPiano],
    svg: 'half-note'
  },
  {
    beats: [beats.dottedHalfPiano],
    svg: 'dotted-half-note'
  },
  {
    beats: [beats.wholePiano],
    svg: 'whole-note'
  },
]);
</script>
