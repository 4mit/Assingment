var myapp =angular.module('myapp',[]);
myapp.controller('ctrl',function($scope,$http){
	  $scope.pokemons ={};
	  $scope.evolution ={};
	  var weeknessCount = [],	
	      weeknessArray = [],
	      evolution = [];	
	
	 function fetchSequence(allPokemons,prev,next){
		   let finalDetialArray = []; 
		 	for(all in allPokemons){
				let DetailSecond =[]; 
		  		let DetailThird = [];
				
					if(prev == allPokemons[all].num){
						DetailSecond['name'] = allPokemons[all].name;
						DetailSecond['height'] = allPokemons[all].height;
						DetailSecond['weight'] = allPokemons[all].weight;
						DetailSecond['spawn_time'] = allPokemons[all].spawn_time;
						finalDetialArray.push(DetailSecond);
					}
					if(next == allPokemons[all].num){
						DetailThird['name'] = allPokemons[all].name;
						DetailThird['height'] = allPokemons[all].height;
						DetailThird['weight'] = allPokemons[all].weight;
						DetailThird['spawn_time'] = allPokemons[all].spawn_time;
						finalDetialArray.push(DetailThird);
					}				
			}	
			return finalDetialArray;
	 }
	  //Getting Top Weekness Pokemons 
	  function topWeeknessPokes(weeknessArray,allPokemons){	  
		  let count =0;
		  var evolutionContainer =[];
		  for(poke in allPokemons){
			  if(allPokemons[poke].weaknesses.indexOf(weeknessArray[0]) !=-1 &&
				  allPokemons[poke].weaknesses.indexOf(weeknessArray[1]) !=-1 && 
				  allPokemons[poke].weaknesses.indexOf(weeknessArray[2]) !=-1)
						count++;

			  let tmpObj ={};
			  
			  if(allPokemons[poke].hasOwnProperty('next_evolution') && allPokemons[poke].hasOwnProperty('prev_evolution')){
				  
				  let tempArr = fetchSequence(allPokemons,allPokemons[poke].prev_evolution[0].num,allPokemons[poke].next_evolution[0].num);
				  tmpObj.first = {'num':allPokemons[poke].prev_evolution[0].num,
										'name':tempArr[0]['name'],
										'height':tempArr[0]['height'],
										'weight':tempArr[0]['weight'],
										'spawn_time':tempArr[0]['spawn_time']
									  };
				  tmpObj.second  = {'num':allPokemons[poke].num,
										 'name':allPokemons[poke].name,
										 'height':allPokemons[poke].height,
										 'weight':allPokemons[poke].weight,
										 'spawn_time':allPokemons[poke].spawn_chance
										};
				  tmpObj.third  ={'num':allPokemons[poke].next_evolution[0].num,
										'name':tempArr[1]['name'],
										'height':tempArr[1]['height'],
										'weight':tempArr[1]['weight'],
										'spawn_time':tempArr[1]['spawn_time']
									  };
				  
			  }else 
				  continue;		// Skipping records since it dont have either previous evolution  or next evolution or having only one of them
			  
			  evolutionContainer.push(tmpObj);
		  }
		 $scope.evolution = evolutionContainer;
		  console.log($scope.evolution);
		  return count;			
	  }	

	
	  // Obtaining Top 3 Weekness 	
	  function top3Weekness(data,n,allPokemons){
		  for(let i=0;i<n;i++){
				var tmp = Object.keys(data[i]);
				weeknessArray.push(tmp[0]);
		  }
		  //getting ppokemon having all weekness 
		  var t = topWeeknessPokes(weeknessArray,allPokemons);
		  $scope.havingAllWeekness = t;
		  $scope.weeknessArray = weeknessArray;
	  }

		//Fetching records from server 
		$http.get('https://raw.githubusercontent.com/Biuni/PokemonGOPokedex/master/pokedex.json')
			.then(function(response){
			//console.log(response.data.pokemon);
			$scope.pokemons = response.data.pokemon;
			var allPokemons = response.data.pokemon;
			var t2 = [];
			var keys= [];

			for(poke in $scope.pokemons)
			{  
				for(var i =0 ; i< $scope.pokemons[poke].weaknesses.length ;i++)
				{
					var newkey = $scope.pokemons[poke].weaknesses[i];
					if(keys.indexOf(newkey) ===-1){
						var tmpobj = {};	
						tmpobj[newkey]  =0;
						tmpobj['frequency']  =0;
						t2.push(tmpobj);
						keys.push(newkey);
					}
					if(keys.indexOf(newkey) !=-1){
						for(objs in t2)
							if(t2[objs].hasOwnProperty(newkey))
								t2[objs].frequency +=1;
					}
				}			 
			} 
			t2.sort(function(a,b){
				return b.frequency - a.frequency
			});
			top3Weekness(t2,3, allPokemons);
			//evolutionPrint(allPokemons);
			//console.log(t2);
	});
});