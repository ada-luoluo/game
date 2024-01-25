<template>
    <div class="page-banner">
        <div class="container">
          <div class="page-banner-content">
            <div class="page-banner-name">
              <slot name="banner-name"></slot>

              <div class="other-links">
                 <div class="links-1">
                   <slot name="other-links-1"></slot>
                 </div>
                <div class="links-1">
                  <slot name="other-links-2"></slot>
                </div>
                <div class="links-1">
                  <slot name="other-links-3"></slot>
                </div>
              </div>

            </div>
            <div class="page-banner-icon">
              <slot name="banner-icon"></slot>
            </div>
          </div>
      </div>
    </div>

  <div class="page-line common-border"></div>

</template>

<script>
export default {
  name: "pageBanner"
}
</script>

<style>


</style>