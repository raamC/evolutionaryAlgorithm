const target: string = 'Hello, World!';
const str: string = 'jjKnp4bqpmAbp';

// console.log(
//     calculateFitness(str,target)
// );

// jjKnp4bqpmAbp = 15491;



function calculateFitness(trait: string, target: string){
    const targetArray: string[] = target.split('');
    const traitArray: string[] = trait.split('');
    let fitnessScore: number = 0;
    targetArray.map((char, index) => {
        const diff: number = char.charCodeAt(0) - traitArray[index].charCodeAt(0);
        fitnessScore = fitnessScore + (diff * diff);
    })
    return fitnessScore;
}

if (calculateFitness('jjKnp4bqpmAbp', 'Hello, World!') === 15491){
    console.log('Test for calculateFitness function passed');
} else {
    console.log('Test for calculateFitness function failed');
}