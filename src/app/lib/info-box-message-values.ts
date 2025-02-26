export const infoBoxMessageValues = {
  default: (pokemonName: string) => ({
    key: 'default',
    params: { pokemonName },
  }),
  getAttackerPlusMoveName: (pokemonName: string, moveName: string) => ({
    key: 'attackerPlusMove',
    params: { pokemonName, moveName },
  }),
};
