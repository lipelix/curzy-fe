import { Input, Divider, Label} from 'semantic-ui-react'
import RatesTable from './RatesTable';

function HomePage() {
  return (
    <div className="HomePage">
      <Input labelPosition='right' type='text'>
        <Label basic>CZK</Label>
        <input />
      </Input>

      <Divider hidden />
    
      <Input labelPosition='right' type='text'>
        <Label basic>EUR</Label>
        <input />
      </Input>

      <RatesTable />
    </div>
  );
}

export default HomePage;
