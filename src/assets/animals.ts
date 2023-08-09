import { shuffle } from "./shuffle";

const animals = ['Mouse', 'Chipmunk', 'Marmot', 'Owl', 'Fox', 'Weasel', 'Raccoon', 'Bat', 'Frog', 'Raven'];
animals.push(...animals, 'Bear');
shuffle(animals);

export default animals;