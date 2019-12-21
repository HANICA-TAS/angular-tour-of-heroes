import {MessageService} from './message.service';

describe('MessageService', () => {
  let messageService;

  beforeEach(() =>
  {
    messageService = new MessageService();
  });

  it('Has empty messages after creation', () => {
    expect(messageService.messages.length).toBe(0);
  });

  it('Has one message after adding one', () => {
    messageService.add("");
    expect(messageService.messages.length).toBe(1);
  });

  it('Has no messages after adding and removing one', () => {
    messageService.add("");
    messageService.clear();
    expect(messageService.messages.length).toBe(0);
  });


});
