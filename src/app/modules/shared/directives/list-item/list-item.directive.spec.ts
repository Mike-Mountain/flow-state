import { ListItemDirective } from './list-item.directive';

describe('NgmListItemDirective', () => {
  it('should create an instance', () => {
    const directive = new ListItemDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
