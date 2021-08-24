<script>
    import {assets} from "$app/paths"
</script>
<style lang="scss">
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
        left:0;
        width: 100%;
        background-color: var(--color-background-dark);
        padding: 20px 60px;
        z-index: 100;

        .left-options, .right-options {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        }

        .right-options {
            justify-content: flex-end;
        }
        .logo {
            height:40px;
            margin-right: 20px;
        }

        ul {
            list-style: none;
            margin: 0;
            padding:0;
        }
        .link-wrapper {
            display: inline-block;
            margin: 0 15px;
        }

        a {
            text-decoration: none;
            color:white;
            font-size: 17px;

            &:visited {
                color: white;

            }
        }
    }
</style>


<script context="module" lang="ts">
    const routes = [
        {title: "Home", href:"/"},
        {title: "Team", href:"/team"},
        {title: "Contact Us", href:"/projects"},
        {title: "Contact Us", href:"/contact-us"},

    ]
</script>


<nav>
    <div class="left-options">
        <button class="wrapper logo-button">
            <img class="logo" src="{ "static/images/logo-white.png"}" alt="CSAI Logo">
        </button>
        <ul>
            {#each routes as route}
            <li class="link-wrapper">
                <a href={route.href}>{route.title}</a>
            </li>
            {/each}
            
        </ul>
    </div>
    <div class="right-options">
        <button>Join Us</button>
    </div>
    
</nav>