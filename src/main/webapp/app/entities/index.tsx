import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Category from './category';
import Product from './product';
import Order from './order';
import OrderDetails from './order-details';
import Report from './report';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}order`} component={Order} />
      <ErrorBoundaryRoute path={`${match.url}order-details`} component={OrderDetails} />
      <ErrorBoundaryRoute path={`${match.url}report`} component={Report} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
