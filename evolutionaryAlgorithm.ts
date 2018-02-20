const target: string = 'Hello, World!';
const str: string = 'jjKnp4bqpmAbp';

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

interface Individual{
    trait: string;
    fitnessScore: number;
}

interface Population{
    individuals: Individual[];
}

// console.log(Math.floor(Math.random() * 10) + 33);

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}



function generateTrait(target:string) {
    let s: string = '';
    while(s.length < target.length){
        s = s.concat(String.fromCharCode(getRndInteger(32,126)));
    }
    return s;
}

const trait = generateTrait(target);

console.log(trait);
console.log(calculateFitness(trait, target))


// Tests

// if (calculateFitness('jjKnp4bqpmAbp', 'Hello, World!') === 15491){
//     console.log('Test for calculateFitness function passed');
// } else {
//     console.log('Test for calculateFitness function failed');
// }

