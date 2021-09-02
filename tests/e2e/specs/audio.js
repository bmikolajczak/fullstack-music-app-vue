const { createYield } = require('typescript');

describe('Audio player', () => {
  it('plays audio', () => {
    cy.visit('/');
    // selecting an element
    cy.get('.composition-name:first').click();
    // playing the audio
    cy.get('#play-button').click();
    cy.wait(5000);
    // clicking puse button
    cy.get('#player-play-button').click();
  });
});
