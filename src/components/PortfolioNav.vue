<script setup lang="ts">
import { computed, ref } from 'vue';
import { site } from '../config/site';

const showProjectsLink = site.showProjectsLink;
const showProjects = ref(false);
const animated = ref(false);

const iconsClass = computed(() => ({
  animated: true,
  icons: true,
  ...(animated.value && {
    fadeInRight: !showProjects.value,
    fadeOutRight: showProjects.value,
  }),
}));

const projectsClass = computed(() => ({
  animated: true,
  projects: true,
  ...(animated.value && {
    fadeInLeft: showProjects.value,
    fadeOutLeft: !showProjects.value,
  }),
}));

function openProjects(event: Event) {
  event.preventDefault();
  animated.value = true;
  showProjects.value = true;
}

function closeProjects(event: Event) {
  event.preventDefault();
  showProjects.value = false;
}
</script>

<template>
  <p v-if="showProjectsLink" :class="projectsClass">
    <a class="navR" href="#" title="back to links" @click="closeProjects">
      <i class="fas fa-chevron-left" />
    </a>
    <a
      v-for="project in site.projects"
      :key="project.id"
      :href="project.path"
      :title="project.title"
      :target="'openInNewTab' in project && project.openInNewTab ? '_blank' : undefined"
      :rel="'openInNewTab' in project && project.openInNewTab ? 'noopener noreferrer' : undefined"
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
    <a
      v-if="showProjectsLink"
      class="navL"
      href="#"
      title="my projects"
      @click="openProjects"
    >
      <i class="fas fa-code" />
    </a>
  </p>
</template>
