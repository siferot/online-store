import React, {useContext} from 'react'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { Row, Card } from 'react-bootstrap';

const BrandBar = observer(() => {
  const {device} = useContext(Context)

  return (
    <Row className="d-flex gx-0">
      {device.brands.map(brand =>
        <Card
          bg={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
          text={brand.id === device.selectedBrand.id ? 'light' : 'dark'}
          key={brand.id}
          className="p-3 w-auto user-select-none"
          style={{cursor: 'pointer'}}
          onClick={() => {
            device.selectedBrand.id === brand.id ? device.setSelectedBrand({}) : device.setSelectedBrand(brand)
            
          }}
        >
          {brand.name}
        </Card>
      )}
    </Row>
  );
});

export default BrandBar;