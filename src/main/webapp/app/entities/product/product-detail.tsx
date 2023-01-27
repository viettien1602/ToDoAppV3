import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './product.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ProductDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">
          <Translate contentKey="toDoAppV3App.product.detail.title">Product</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="productName">
              <Translate contentKey="toDoAppV3App.product.productName">Product Name</Translate>
            </span>
          </dt>
          <dd>{productEntity.productName}</dd>
          <dt>
            <span id="img">
              <Translate contentKey="toDoAppV3App.product.img">Img</Translate>
            </span>
          </dt>
          <dd>{productEntity.img}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="toDoAppV3App.product.price">Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.price}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="toDoAppV3App.product.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{productEntity.quantity}</dd>
          <dt>
            <span id="importDate">
              <Translate contentKey="toDoAppV3App.product.importDate">Import Date</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.importDate ? <TextFormat value={productEntity.importDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="toDoAppV3App.product.status">Status</Translate>
            </span>
          </dt>
          <dd>{productEntity.status ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="toDoAppV3App.product.category">Category</Translate>
          </dt>
          <dd>{productEntity.category ? productEntity.category.categoryName : ''}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;
