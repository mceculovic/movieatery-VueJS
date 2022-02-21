<template>
    <div class="nf-container">
        <h1>404</h1>
        <h2>Not found</h2>
        <h5>The resource requested could not be found on this server</h5>
    </div>
</template>
<script>
export default {
    name: 'NotFound'
}
</script>
<style scoped>
    .nf-container{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    h1{
        font-size: 20rem;
    }
    h2{
        font-size: 5rem;
    }
    h3{
        font-size: 3rem;
    }
</style>