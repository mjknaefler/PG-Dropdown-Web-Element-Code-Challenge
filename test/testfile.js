const { expect } = require("chai");
describe('Test cases to understand how to interact with dropdown menus', () =>{
    it('Verify the current date is select by default in Sign Up dropdown', async () => {
        /**
         * 1. Launch facebook.com 
         * 2. Click on Create New Account button
         * 3. Verify current date is displayed in the birthdate dropdowns.
         */

        //1. Launch facebook.com 
        await browser.url('https://facebook.com/');

        //2. Click on Create New Account button
        const createNewAccountButtonElement = await $('//a[@data-testid="open-registration-form-button"]');
        await createNewAccountButtonElement.click();

        //3. Verify current date is displayed in the birthdate dropdowns.
        await $('//select[@aria-label="Month"]').selectByIndex(9);
        const birthdayMonthSelection = await $('//select[@aria-label="Month"]//option[@selected="1"]');
        expect(await birthdayMonthSelection.getText()==="Oct","Selected birth month is not current month").to.be.true;

        await $('//select[@aria-label="Day"]').selectByAttribute('value','26');
        const birthdayDaySelection = await $('//select[@aria-label="Day"]//option[@selected="1"]');
        expect(await birthdayDaySelection.getText()==="26",'Selected birth day is not current day').to.be.true;

        await $('//select[@aria-label="Year"]').selectByVisibleText('2023');
        const birthdayYearSelection = await $('//select[@aria-label="Year"]//option[@selected="1"]');
        expect(await birthdayYearSelection.getText()==="2023","Selected birth year is not current year").to.be.true;
    })
})