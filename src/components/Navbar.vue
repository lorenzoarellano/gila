<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <div class="d-flex w-50 order-0">
            <router-link class="navbar-brand mr-1" to="/">Gila Test</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <div class="navbar-collapse collapse justify-content-center order-2" id="collapsingNavbar">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/thanks">Thanks</router-link>
                </li>
            </ul>
        </div>
        <span class="navbar-text small text-truncate mt-1 w-50 text-right order-1 order-md-last">By Lorenzo Arellano</span>
    </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
