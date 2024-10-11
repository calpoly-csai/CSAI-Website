<div class = "container">
    <div class = "right-section">
        <h2>THANKS FOR SUPPORTING CSAI</h2>
        <h1>Your order was completed <br> successfully!</h1>
    </div>
    <!-- <div class="accent-circle"></div> -->
    <div class = "left-section">
        <img src="/images/logo.svg" alt="logo" />
        
    </div>

</div>

<style>
	/* general  */
	@import '../../../../scss/global.scss';
	@import '../../../../scss/utils.scss';
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    .container{
        margin-top: 180px;
		margin-left: 50px;
		display: grid;
		grid-template-columns: 0.9fr 0.1fr;
        padding: 150px;
        min-height: calc(140vh - 180px - 180px - 100px);
    }

    .right-section h2{
        font-size: 29px;

    }
    .right-section h1{
        font-size: 50px;
        font-weight: 100;
    }
    
    /* low priority */
    /* .accent-circle {
        position: absolute; 
        bottom: 0px;
        right: 10px;
        width: 600px; 
        height: 600px; 
        background-color: lightblue; 
        border-top-left-radius: 100px;
        z-index: -1;
    } */



</style>