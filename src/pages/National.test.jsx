import {render, screen, waitFor, fireEvent} from '@testing-library/react'
import National from './National.jsx'
import { setupServer } from 'msw/node';
import { handlersNational } from '../mocks/handlers-national'; 



// CREO SERVER MSW
const server = setupServer(...handlersNational)

// Esegui il setup e il teardown del server MSW prima e dopo i test
beforeAll(() => server.listen()); //PREPARA IL SERVER AL PRIMO AVVIO
afterAll(() => server.close()); //CHIUDE IL SERVER DOPO TUTTI I TEST
afterEach(() => server.resetHandlers()); //CHIAMATA QUANDO FINISCE UN TEST PER POTER REIMPOSTARE E PREPARARE AL PROSSIMO TEST





describe('API FAKE tests', () => {

    it('should render the Charizard data', async () => {
        render(<National/>);
        await waitFor(() => {
            setTimeout(() => {
                const idCharizard = screen.getByText('#id-6');
                const nameCharizard = screen.getByText('Pokemon-6');
                const charizardImage = screen.getByTestId('Pokemon-6');
                const switchButton = screen.getByTestId('switchButton');
                const firstType = screen.getByTestId('Pokemon-6-type1');
                const secondType = screen.getByTestId('Pokemon-6-type2');
                expect(idCharizard).toBeInTheDocument();
                expect(nameCharizard).toBeInTheDocument();
                expect(firstType).toBeInTheDocument();
                expect(secondType).toBeInTheDocument();
                expect(charizardImage).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png');
                fireEvent.click(switchButton);
                expect(charizardImage).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png')
            }, 2000)
        }, {timeout: 5000})
    })
})

describe('API REAL tests', () => {

    it('should render the pokemon data', async () => {
        render(<National/>);
        await waitFor(() => {
            setTimeout(() => {

                const idPokemon = screen.getByTestId('legend');
                const namePokemon = screen.getByText('Bulbasaur');
                const firstType = screen.getByTestId('bulbasaurgrass')
                const secondType = screen.getByTestId('bulbasaurpoison');
                const image = screen.getByTestId('bulbasaur');
                const switchButton = screen.getByTestId('switchButton');
                expect(idPokemon).toHaveTextContent('#1');
                expect(namePokemon).toBeInTheDocument();
                expect(firstType).toBeInTheDocument();
                expect(secondType).toBeInTheDocument();
                expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');

                fireEvent.click(switchButton);
                expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png');

            }, 2000)
        }, {timeout: 5000})
    })
})


//INPUT
describe('input test', () => {

    it('should render the results', async () => {
        render(<National/>);
        await waitFor(() => {
            setTimeout(() => {
                const bulbasaurName = screen.getByText('Bulbasaur');
                const input = screen.getByPlaceholderText('Search');
                expect(bulbasaurName).toBeVisible();
                
                fireEvent.change(input, {target: {value: 'Pikachu'}})
                const pikachuName = screen.getByText('Pikachu');
                expect(pikachuName).toBeVisible();
                expect(bulbasaurName).not.toBeVisible();
            }, 2000)
        }, {timeout: 5000})
     })

})


//SWITCH
describe('button tests', () => {

    it('should render the shiny images when I click on the switch', async () => {
        render(<National/>);
        await waitFor(() => {
            setTimeout(() => {
                const switchButton = screen.getByTestId('switchButton');
                const venusaur = screen.getByTestId('Venusaur');
                expect(venusaur).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png');

                fireEvent.click(switchButton);
                expect(venusaur).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png');
            }, 2000)
        }, {timeout: 5000})
    })

})


//BUTTON SHOW MORE
describe('show more button tests', () => {

    it('should render the show more button', async () => {
        render(<National/>);
        await waitFor(() => {
            setTimeout(() => {
                const showMoreButton = screen.getByText('Show More');
                expect(showMoreButton).toBeVisible();
                const initialPokemon = screen.getAllByTestId('sections');
                expect(initialPokemon).toHaveLength(670);
        
                fireEvent.click(showMoreButton);
                const mewtwo = screen.getByText('Mewtwo');
                expect(mewtwo).toBeVisible();
            }, 2000)
        }, {timeout: 5000})
    })
})
