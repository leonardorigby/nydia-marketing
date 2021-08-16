import React, { useState } from 'react';
import '../styles/store/error.scss';

import axios from 'axios';



// import '../styles/store/Registro.css';


export default function PageError() {

 
  return (
    <div className="error-container">
      <section class="page_404">
	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2">
		Hmmm...
		</h3>
		
		<p>like one of the  developers fell asleep</p>
		<a href="/" class="link_404">Ir al Inicio</a>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
    </div>
  );
}