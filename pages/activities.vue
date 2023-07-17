<template>
  <div class="wrapper container">
    <header class="page-header">
      <br />
      <h1>Weekly schedule</h1>
    </header>
    <div class="row">
      <div class="iframe-container">
        <iframe
          style="border: 1px solid rgba(0, 0, 0, 0.1)"
          width="800"
          height="450"
          id="figma-frame"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F34VQlVH9uW5nabviromCSY%2FPosters%3Fpage-id%3D4519%253A4342%26type%3Ddesign%26node-id%3D4519-4363%26viewport%3D1161%252C252%252C0.09%26t%3DKVzbBCeuAIBPlcLK-1%26scaling%3Dscale-down-width%26starting-point-node-id%3D4519%253A4433%26hotspot-hints%3D0%26mode%3Ddesign%26hide-ui%3D1"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activities",
};
</script>

<style lang="scss" scoped>
.iframe-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  margin-bottom: 25px;
  height: 0;
}
.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
