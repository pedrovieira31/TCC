<template>
    <div class="info">
        <h1><i v-if="icon" :class="icon"></i>{{main}}</h1>
        <h2>{{sub}}</h2>
        <hr>
    </div>
</template>

<script>
export default {
    nome:'infoUsuario',
    props:['icon','main','sub']
}
</script>

<style>
    .info h1{
        margin: 0px;
        font-size: 25px;
    }
    h2{
        margin-top: 2px;
        font-size: 25px;
    }
    h3{
        margin-top: 2px;
        font-size: 20px;
    }
    
</style>