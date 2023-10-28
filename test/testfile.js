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
        const date = await new Date();
        let day = await date.getDate();
        let month = date.toLocaleString('default', {month: 'short'});
        let year = await date.getFullYear();

        await $('//select[@aria-label="Month"]').selectByVisibleText(`${month}`);
        const birthdayMonthSelection = await $('//select[@aria-label="Month"]//option[@selected="1"]');
        expect(await birthdayMonthSelection.getText()===`${month}`,"Selected birth month is not current month").to.be.true;
        browser.pause(5000);

        await $('//select[@aria-label="Day"]').selectByAttribute('value',`${day}`);
        const birthdayDaySelection = await $('//select[@aria-label="Day"]//option[@selected="1"]');
        expect(await birthdayDaySelection.getText()===`${day}`,'Selected birth day is not current day').to.be.true;
        browser.pause(5000);

        await $('//select[@aria-label="Year"]').selectByVisibleText(`${year}`);
        const birthdayYearSelection = await $('//select[@aria-label="Year"]//option[@selected="1"]');
        expect(await birthdayYearSelection.getText()===`${year}`,"Selected birth year is not current year").to.be.true;
        browser.pause(5000);
    })
    it('Verify the travelers count on homepage', async () => {
        /**
         * 1. Launch hotels.com 
         * 2. Make Adults=4 in Room-1
         * 3. Click Add another room
         * 4. Make Adults=3 in Room-2
         * 5. Click on Done button
         * 6. Verify total-travalers is equals to the number of adults mentioned in rooms
         */

        //1. Launch hotels.com 
        await browser.url('https://hotels.com/');

        //2. Make Adults=4 in Room-1
        
        const roomPickerElement = await $('//button[@data-stid="open-room-picker"]');
        await roomPickerElement.click();
        await browser.pause(2000);

        const increaseAdultTravelersButton = await $('//input[@id="traveler_selector_adult_step_input-0"]/following-sibling::button');
        await increaseAdultTravelersButton.click();
        await increaseAdultTravelersButton.click();
        await browser.pause(2000);
        
        //3. Click Add another room
        const addAnotherRoomButton = await $('//button[@data-test-id="traveler_selector_add_room"]');
        await addAnotherRoomButton.click();
        
        //4. Make Adults=3 in Room-2
        const increaseAdultTravelersInRoom2Button = await $('//h3[text()="Room 2"]/following-sibling::div//input[@aria-label="Adults"]/following-sibling::button');
        await increaseAdultTravelersInRoom2Button.click();
        await increaseAdultTravelersInRoom2Button.click();
        await browser.pause(2000);

        //5. Click on Done button
        const doneButton = await $('//button[@id="traveler_selector_done_button"]');
        await doneButton.click();
        await browser.pause(2000);

        //6. Verify total-travalers is equals to the number of adults mentioned in rooms
        const travelersBoxElement = await $('//button[@data-stid="open-room-picker"]');
        const travelersAndRoomsTotal = await travelersBoxElement.getAttribute('aria-label');
        const travelersTotal = await travelersAndRoomsTotal.slice(11,12);
        expect(travelersTotal==="7","Total travelers does not equal 7").to.be.true;
    })
})