
describe('angular rome', function() {
  var $scope, element, $compile;

  beforeEach(module('bgn.rome'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  it('should display date and time as default', function() {
    element = angular.element('<rome ng-model="demo"></rome>');
    element = $compile(element)($scope);
    $scope.$apply();

    expect(element.find('input')).toBeTruthy();
  });
});