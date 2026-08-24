<script setup lang="ts">
import { computed, ref } from 'vue';
import { site } from '../config/site';

const showProjects = ref(false);
const hasVisitedProjects = ref(false);

const iconsClass = computed(() => ({
  animated: true,
  icons: true,
  ...(hasVisitedProjects.value && {
    fadeInRight: !showProjects.value,
    fadeOutRight: showProjects.value,
  }),
}));

const projectsClass = computed(() => ({
  animated: true,
  projects: true,
  ...(hasVisitedProjects.value && {
    fadeInLeft: showProjects.value,
    fadeOutLeft: !showProjects.value,
  }),
}));

function showProjectsView(event: Event) {
  event.preventDefault();
  hasVisitedProjects.value = true;
  showProjects.value = true;
}

function showIconsView(event: Event) {
  event.preventDefault();
  showProjects.value = false;
}
</script>

<template>
  <p :class="projectsClass">
    <a class="navR" href="#" title="back to links" @click="showIconsView">
      <i class="fas fa-chevron-left" />
    </a>
    <a
      v-for="project in site.projects"
      :key="project.id"
      :href="project.path"
      :title="project.title"
    >
      {{ project.label }}
    </a>
  </p>

  <p :class="iconsClass">
    <a
      v-for="item in site.social"
      :key="item.id"
      :href="item.url"
      :title="item.title"
      target="_blank"
      rel="noreferrer noopener"
    >
      <i :class="item.icon" />
    </a>
    <a class="navL" href="#" title="my projects" @click="showProjectsView">
      <i class="fas fa-code" />
    </a>
  </p>
</template>
