import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const burger = props => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map(item => {
			return [ ...Array(props.ingredients[item]) ] // [] onde se salada:3 traz pra salada [, , ]
				.map((_, i) => {
					return <BurgerIngredient key={item + i} type={item} />;
				});
		})
		.reduce((acumulado, item) => {
			return acumulado.concat(item);
		});

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type={'bread-top'} />
			{transformedIngredients}
			<BurgerIngredient type={'bread-bottom'} />
		</div>
	);
};

export default burger;

/*const burger = props => {
	const transformedIngredients = Object.keys(props.ingredients) //Object.keys cria um ARRAY com o nome das PROPRIEDADES de um OBJETO = [salad,cheese,bacon,meat]
		.map(item => {    								          //para cada item deste array..(Exemplo, salad)
			return [ ...Array(props.ingredients[item])]    		 //trazer um novo array,com [...Array(numero q quer)], se tiver salada:2 no state, [[,][][][]]...conta qtos item tem 
																      se fosse cheese, seria um array com dois espaços vazios, pois [...Array(ingredients.chesse)] = [ , ] //2 espaços vazios		         
			.map((_, i) => {                                     //para cada item desse novo arr [](length=1 no caso de salad),com nada de item e um indice     
				 return <BurgerIngredient key={item + i} type={item} />; //retornar o component com os parametros key = salada0, type = salad....
				 															Nesse ultimo map ele ainda ta respeitando o parametro ITEM, do map de cima...no caso 'salad'
		})..reduce((acumulado, item) => {								//serve para transformar o array com varios itens em um só concatenado, dai da pra usar o lenght
				return acumulado.concat(item);                         //pega todos os <BurgerIngredient type>.... que criou e coloca tudo no index 0 de um novo array, 
																		  
	});
	if (transformedIngredients.length === 0) {                        	//pelo reduce de cima, se for 0, traz um paragrfo na tela com o texto abaixo, senao segue
		transformedIngredients = <p>Por favor, adicione ingredientes</p>;
	}






	mesma formuma em resumo:

	se ing: {
		salad: 2,
		cheese: 0,
		meat: 0,
		bacon: 0)

const burger = props => {                                                            
	const transformedIngredients = Object.keys(props.ingredients).map(item => {  //transformedIngredients = [salad,bacon,cheese,meat]
		return [ ...Array(props.ingredients[item]) ]							//  [[ , ],[],[],[]]  //um array com 4 indx, onde cada indx é um array, e cada array com seu tamanho (salada por exemplo tem 2 [ , ]) 
			.map((_, i) => {																
				return <BurgerIngredient key={item + i} type={item} />;				//BurgerIngredient key=salad0 type'salad' e assim para cada item do array
																					//no fim trouxe 6 itens, pra mim seriam 4 pois o ultimo map deveria rodar em 4 itens e nao em seis	
		});																			//	transformedIngredients = [  <BurgerIngredient type={'salad'} key={salad0} />,
																													<BurgerIngredient type={'bacon'} key={bacon1} />,
																													<BurgerIngredient type={'cheese'} key={cheese0} />,
																													<BurgerIngredient type={'cheese'} key={cheese1} />,	
																												 ]     etc....	
	});

	}).reduce((acumulado, item) => {									//
				return acumulado.concat(item);                         //soma todos burguer em um só
																		  
	});
	


*/

/*.reduce((acumulado, item) => {
			return acumulado.concat(item);
		});*/
