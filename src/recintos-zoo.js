class RecintosZoo {
    constructor() {
        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };

        this.recintos = [
            { id: 1, bioma: 'savana', capacidade: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { id: 2, bioma: 'floresta', capacidade: 5, animais: [] },
            { id: 3, bioma: 'savana e rio', capacidade: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { id: 4, bioma: 'rio', capacidade: 8, animais: [] },
            { id: 5, bioma: 'savana', capacidade: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
        ];
    }

    analisaRecintos(especieAnimal, qtd) {
        if (!this.animais[especieAnimal]) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }

        if (qtd <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }

        const infoAnimal = this.animais[especieAnimal.toUpperCase()];
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const biomasAnimal = infoAnimal.biomas;
            const biomaRecinto = recinto.bioma;
            const biomaAdequado = biomasAnimal.includes(biomaRecinto) || (biomasAnimal.includes('savana') && biomaRecinto === 'savana e rio');

            if (!biomaAdequado) {
                continue;
            }

            let espacoOcupado = 0;
            let possuiCarnivoros = false;
            let possuiHerbivoros = false;
            let variasEspecies = false;

            for (const animalPresente of recinto.animais) {
                const infoPresente = this.animais[animalPresente.especie];
                espacoOcupado += animalPresente.quantidade * infoPresente.tamanho;

                if (infoPresente.carnivoro) {
                    possuiCarnivoros = true;
                } else {
                    possuiHerbivoros = true;
                }

                if (animalPresente.especie !== especieAnimal && especieAnimal === 'HIPOPOTAMO' && biomaRecinto !== 'savana e rio') {
                    espacoOcupado = recinto.capacidade + 1;
                    break;
                }

                if (especieAnimal === 'MACACO' && recinto.animais.length === 0) {
                    espacoOcupado = recinto.capacidade + 1;
                    break;
                }

                if (recinto.animais.length > 1 || (recinto.animais.length === 1 && animalPresente.especie !== especieAnimal)) {
                    variasEspecies = true;
                }
            }

            if (possuiCarnivoros && infoAnimal.carnivoro === false) {
                continue;
            }

            if (possuiHerbivoros && infoAnimal.carnivoro) {
                continue;
            }

            espacoOcupado += qtd * infoAnimal.tamanho;

            if (variasEspecies) {
                espacoOcupado += 1;
            }

            if (espacoOcupado <= recinto.capacidade) {
                recintosViaveis.push(`Recinto ${recinto.id} (espaço livre: ${recinto.capacidade - espacoOcupado} total: ${recinto.capacidade})`);
            }
        }

        if (recintosViaveis.length > 0) {
            return { erro: false, recintosViaveis: recintosViaveis.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1])) };
        } else {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }
    }
}

export { RecintosZoo as RecintosZoo };
