from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import random

women_images = [
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1486663845017-3eedaa78617f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
    "https://images.unsplash.com/photo-1506956191951-7a88da4435e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80",
    "https://images.unsplash.com/photo-1523264766116-1e09b3145b84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80",
    "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80",
    "https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=766&q=80",
    "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    "https://images.unsplash.com/photo-1557555187-23d685287bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
    "https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1484588168347-9d835bb09939?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1795&q=80",
    "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1540324155974-7523202daa3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1601168658155-24ba806c086a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1478465726282-ddb11650c80b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1563306406-e66174fa3787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=732&q=80",
    "https://images.unsplash.com/photo-1594744803086-b902dd06f88a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
    "https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
    "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1599842057874-37393e9342df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1502767882403-636aee14f873?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1495482336510-f7716cc28940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1594745561149-2211ca8c5d98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1592214534258-0067435006d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=778&q=80",
    "https://images.unsplash.com/photo-1614270532514-904c3aa5628e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
]

men_images = [
    "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://plus.unsplash.com/premium_photo-1676389763792-4519eaf7c4cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1600878459138-e1123b37cb30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=812&q=80",
    "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    "https://images.unsplash.com/photo-1481437642641-2f0ae875f836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1268&q=80",
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://plus.unsplash.com/premium_photo-1664456329834-8b832667ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1743&q=80",
    "https://images.unsplash.com/photo-1582274528667-1e8a10ded835?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
    "https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    "https://plus.unsplash.com/premium_photo-1680184592960-9aa3ccb163f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1624140716840-5d89f311f500?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=740&q=80",
    "https://images.unsplash.com/photo-1600603405959-6d623e92445c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://plus.unsplash.com/premium_photo-1679162280637-997008dcaf57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1442328166075-47fe7153c128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1605949405965-d49ada3f9189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
    "https://plus.unsplash.com/premium_photo-1672281090748-ae3bcd29c832?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1688&q=80",
    "https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=892&q=80",
    "https://images.unsplash.com/photo-1585807515950-bc46d934c28b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1591084728795-1149f32d9866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80",
    "https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://plus.unsplash.com/premium_photo-1676998930907-796724570f0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1611485988300-b7530defb8e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1896&q=80",
    "https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1461800919507-79b16743b257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1473172707857-f9e276582ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1442&q=80",
    "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1611608822650-925c227ef4d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1549237511-bbe6a0979d6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1581382576286-b6c8f871fb07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1531879251-3da65dd78c99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
]

about_sections_women = [
    "Passionate traveler seeking a partner to explore the world with. Let's create unforgettable memories!",
    "Free-spirited artist with a love for painting and indie music. Seeking a creative soul to share inspiration.",
    "Adventure seeker who enjoys hiking, camping, and adrenaline-pumping activities. Let's embrace the thrill of life together!",
    "Ambitious professional, passionate about my career. Looking for someone who supports my ambitions and shares their own.",
    "Animal lover, especially dogs! Seeking a compassionate partner who can appreciate the joy pets bring to our lives.",
    "Foodie at heart. Let's embark on culinary adventures, exploring new tastes and sharing delightful experiences.",
    "Fitness enthusiast who enjoys yoga, running, and staying active. Seeking a partner to join me on this wellness journey.",
    "Bookworm with a penchant for classic literature. Seeking a fellow reader to discuss our favorite novels and discover new ones.",
    "Nature lover and environmental advocate. Looking for someone who cares about our planet and wants to make a positive impact.",
    "Music aficionado with a diverse taste. Let's share playlists, go to concerts, and dance the night away!",
    "Family-oriented woman who values close relationships. Seeking someone with strong family values and a loving heart.",
    "Creative soul who enjoys writing poetry and expressing emotions through art. Looking for someone who appreciates the beauty of self-expression.",
    "Optimistic and always wearing a smile. Let's share laughter, joy, and create a lifetime of happiness together.",
    "Intellectual and deep thinker. Seeking a partner who enjoys engaging conversations and exploring life's philosophical questions.",
    "Beach lover and sun seeker. Let's soak up the sun, build sandcastles, and watch the mesmerizing sunsets together.",
    "Down-to-earth and genuine. Looking for an authentic connection built on trust, respect, and shared values.",
    "Amateur chef, always experimenting with new recipes. Seeking a partner who appreciates good food and is willing to be my taste tester!",
    "Artistic soul with a passion for photography. Let's capture beautiful moments and create our own visual story.",
    "Empathetic and caring. Seeking someone who values kindness and wants to make a positive impact on others' lives.",
    "Movie enthusiast who enjoys a wide range of genres. Let's have cozy movie nights and get lost in captivating stories.",
    "Independent woman with a strong sense of self. Seeking a partner who respects and cherishes my independence.",
    "Tech-savvy and curious about the latest innovations. Looking for someone who shares a passion for technology and geek culture.",
    "Fitness and wellness are essential to me. Seeking a partner who values a healthy lifestyle and takes care of their mind and body.",
    "Lover of live performances, from theater to concerts. Let's immerse ourselves in the magic of the stage together.",
    "Social justice advocate, committed to making the world a more inclusive place. Seeking a partner who shares these values.",
    "Avid hiker and nature explorer. Let's embark on breathtaking trails and discover the beauty of the great outdoors.",
    "Whimsical and dreamy. Seeking a partner to dance under the stars and embrace the enchantment of life.",
    "Philanthropist with a heart for volunteering. Looking for someone who wants to make a difference in the lives of others.",
    "Intellectual curiosity drives me. Seeking a partner who shares a love for learning and exploring new ideas.",
    "Fashion lover with an eye for style. Seeking a partner who appreciates the art of fashion and self-expression through clothing.",
    "Quirky and fun-loving. Let's create our own adventures and write a story that's uniquely ours.",
    "Spiritual and mindful. Seeking a partner who is open to exploring spirituality and finding meaning in life's journey.",
    "Amateur astronomer fascinated by the mysteries of the universe. Looking for someone to stargaze with and ponder the cosmos.",
    "Cheerful and always finding the silver lining. Seeking a partner who brings positivity and light into my life.",
    "Coffee enthusiast and caffeine connoisseur. Let's explore cozy coffee shops and share the joy of a perfectly brewed cup.",
    "Hopeless romantic in search of a soulmate to create a love story filled with passion, laughter, and endless romance.",
    "Traveler seeking a companion to join me on spontaneous trips and discover the beauty of the world together.",
    "Intellectual conversations over a glass of wine are my idea of a perfect evening. Seeking a partner who stimulates my mind.",
    "Animal rights advocate and vegan. Looking for someone who shares a love for animals and a compassionate lifestyle.",
    "Amateur musician who enjoys playing the guitar and singing. Seeking a partner to jam with and create beautiful melodies.",
    "Tech entrepreneur with a drive for innovation. Looking for a partner who can match my ambition and entrepreneurial spirit.",
    "Lover of vintage and retro aesthetics. Seeking a partner to explore flea markets and appreciate the charm of bygone eras.",
    "Genuine and straightforward. Seeking a partner who values honesty and open communication as the foundation of a strong relationship.",
    "Sports enthusiast who enjoys playing and watching various sports. Let's cheer for our favorite teams and enjoy the thrill of competition.",
    "Dog lover and avid dog park visitor. Looking for someone who understands the joy and companionship our furry friends bring.",
    "Social butterfly who enjoys meeting new people and experiencing diverse cultures. Seeking a partner to navigate life's adventures together.",
    "Spiritual explorer on a quest for personal growth. Seeking a partner who shares a desire for self-discovery and enlightenment.",
    "Collector of vinyl records and lover of all things music. Seeking a partner to groove to the rhythm of life with.",
    "Entrepreneurial spirit with a passion for startups. Looking for a partner who shares my excitement for building something great.",
    "Lover of rainstorms and cozy days indoors. Seeking a partner to snuggle up with, listen to the raindrops, and enjoy the simple pleasures."
]

about_sections = [
    "Looking for someone to share pizza and cheesy jokes with. Let's laugh our way into each other's hearts!",
    "Seeking a partner in crime for adventures and corny puns. Warning: Excessive laughter and smiles guaranteed!",
    "If laughter is the key to your heart, then I'm here with a pocketful of cheesy one-liners to unlock it!",
    "Wanted: A fellow lover of laughter, wit, and all things delightfully cheesy. Let's create our own comedy show!",
    "Swipe right if you're ready for a cheesy humor overload. Warning: May cause uncontrollable snorts and giggles.",
    "In search of a partner who appreciates cheesy jokes, spontaneous dance parties, and laughing until our cheeks hurt.",
    "Looking for someone who can keep up with my cheesy sense of humor. Let's share laughter and create unforgettable memories!",
    "If you enjoy witty banter, silly puns, and finding humor in the simplest of things, we'll make the perfect pair!",
    "Seeking a partner who can handle my cheesy humor and still find it gouda. Let's create a life filled with laughter!",
    "Looking for a partner who knows that life's best moments are accompanied by laughter, silliness, and an extra serving of cheese.",
    "If you're up for endless laughter, cheesy pick-up lines, and creating hilarious memories, then we're destined to meet!",
    "Swipe right if you're ready to embark on a journey filled with laughter, witty banter, and copious amounts of cheese.",
    "Seeking a partner who enjoys wordplay, cheesy humor, and appreciates the art of a perfectly timed punchline.",
    "Looking for a partner who can handle my cheesy sense of humor and still find it grate. Let's embark on a laughter-filled journey together!",
    "If you're ready for a blend of quirky humor, spontaneous dance parties, and endless laughter, then let's create our own comedic masterpiece!",
    "Seeking someone who appreciates witty banter, cheesy movie marathons, and the ability to find humor in the most unexpected places.",
    "Looking for a partner who appreciates a good belly laugh, enjoys silly puns, and isn't afraid to dance like no one's watching.",
    "If you're looking for a partner who will serenade you with cheesy songs and make you laugh until you snort, look no further!",
    "Seeking a fellow cheese enthusiast who can appreciate a well-placed pun and doesn't mind sharing their heart with a cheeseball like me.",
    "Looking for someone who loves a good laugh, embraces cheesy puns, and knows that humor is the secret ingredient to a joyful life.",
    "If you're ready for a whirlwind of laughter, goofy moments, and cheesy jokes that will make you groan and grin simultaneously, let's connect!",
    "Seeking a partner who can appreciate a good pun, laugh at the silliest jokes, and dance like no one's watching!",
    "Looking for someone who can match my witty banter and cheesy sense of humor. Together, we'll create a comedic masterpiece!",
    "If you're ready for a marathon of cheesy jokes, movie nights filled with laughter, and adventures that defy gravity, let's connect!",
    "Seeking a partner who can appreciate a well-timed pun, isn't afraid to be silly, and understands that laughter is the best kind of therapy.",
    "Looking for someone who can appreciate a good sense of humor, loves to laugh until their cheeks hurt, and believes that life is better when it's a little cheesy!",
    "If you're looking for a partner who can turn the simplest moments into hilarious memories, join me on this cheesy and laughter-filled journey!",
    "Seeking someone who loves the taste of laughter, delights in cheesy jokes, and isn't afraid to dance like nobody's watching.",
    "Looking for a partner who can appreciate a good laugh, enjoys corny jokes, and has a heart that's open to experiencing joy in the simplest moments.",
    "If you're ready for a relationship that's filled with laughter, playful banter, and endless smiles, then let's create our own rom-com!",
    "Seeking a partner who can match my cheesy humor and understands that laughter is the language of the heart. Let's create a love story that's filled with smiles!",
    "Looking for someone who can match my quirky sense of humor, appreciates puns that make you groan, and believes that laughter is the spice of life!",
    "If you're a fan of witty banter, silly adventures, and spontaneous bursts of laughter, then swipe right and let's create our own comedy sketch!",
    "Seeking a partner who can appreciate a good laugh, enjoys the art of witty wordplay, and can appreciate the cheesy charm in every moment we share.",
]


about_sections_men = [
    "Confident and charismatic, I conquer the world with a wink. Join me on this thrilling journey of self-discovery.",
    "A man of ambition and power, I live life on my terms. Ready to bask in the glow of my success?",
    "I'm a force to be reckoned with - charming, successful, and unapologetically confident. Brace yourself for an exhilarating ride.",
    "In a league of my own, I command attention effortlessly. Join me in a world where mediocrity has no place.",
    "Unleash your adventurous side with a man who knows no limits. I am the embodiment of ambition and thrill.",
    "A true connoisseur of life's luxuries, I indulge in the finest experiences. Are you ready to share the opulence?",
    "I radiate charm and charisma, and success follows me wherever I go. Enter my world and be mesmerized.",
    "With unwavering confidence and a magnetic personality, I set the standards high. Only the extraordinary need apply.",
    "I walk the path of greatness, leaving a trail of awe-struck admirers. Will you be the one to join me at the top?",
    "Bold, fearless, and self-assured - I'm a man who knows what he wants. Enter my world and embrace the extraordinary.",
    "An alpha male with an insatiable appetite for success. Brace yourself for a whirlwind romance like no other.",
    "Join me on an enchanting journey where I push boundaries, challenge norms, and defy expectations.",
    "Unapologetically confident and captivating, I'm a man who leaves an indelible mark on your heart.",
    "I exude power, elegance, and sophistication. Ready to be swept off your feet by a man of unmatched charisma?",
    "A man who commands attention and admiration, I embody excellence in every aspect of life. Dare to keep up?",
    "With a larger-than-life persona, I embark on life's adventures fearlessly. Ready to join me on this thrilling escapade?",
    "Enter my world of opulence, where I captivate hearts and redefine what it means to live life on your own terms.",
    "A captivating presence with an aura of invincibility. Get ready to be spellbound by a man who knows his worth.",
    "I thrive on success, power, and ambition. Ready to experience life at its grandest with a man who embraces the extraordinary?",
    "I radiate charm and exuberance, always striving for greatness. Are you ready to explore the pinnacle of passion?",
    "Unmatched confidence, relentless drive, and a taste for the finer things in life. Welcome to my world of opulence.",
    "I'm the epitome of power and magnetism, drawing you into a world of exhilaration and limitless possibilities.",
    "A visionary with a penchant for success, I challenge norms and inspire others to reach for greatness.",
    "A charismatic force of nature, I leave an indelible mark on all who dare to cross my path. Are you ready for the extraordinary?",
    "I walk the path less traveled, fearlessly charting new territories. Join me on this exciting journey.",
    "Enter the realm of a man who epitomizes success, adventure, and captivating charm. Brace yourself for a transformative experience.",
    "An enigma of confidence and passion, I captivate hearts effortlessly. Ready to be enthralled by a man who knows his worth?",
    "With a commanding presence and an intoxicating aura, I redefine what it means to live life on your own terms.",
    "A man of taste, substance, and unparalleled ambition. Welcome to a world where greatness is the norm.",
    "I'm a master of captivating hearts, a visionary who knows how to create an unforgettable romance.",
    "Join me on a thrilling adventure of passion, success, and unabashed confidence. Together, we'll reach the summit.",
    "An extraordinary man who doesn't settle for mediocrity. Brace yourself for a whirlwind romance like no other.",
    "Unapologetically confident, I embrace my uniqueness. Ready to embark on a journey of unparalleled passion?",
    "Enter my world, where charisma reigns supreme and boundaries are meant to be pushed. Will you be my equal?",
    "With an irresistible magnetism, I captivate hearts effortlessly. Prepare to be swept off your feet by a true gentleman.",
    "A man of unparalleled confidence, ambition, and charisma. Join me on a journey where dreams become reality.",
    "I'm the embodiment of sophistication and power, a true gentleman who embraces life's grandest pleasures.",
    "Ready for a man who is audacious, captivating, and uncompromising in his pursuit of excellence?",
    "I navigate life fearlessly, carving my own path to success. Ready to accompany me on this extraordinary journey?",
    "With a presence that commands attention, I bring excitement and passion to every moment. Let's make magic together.",
    "Unleash your desires with a man who knows how to make you feel extraordinary. Welcome to a world of limitless possibilities.",
    "I'm a maverick of charm and ambition, creating my own destiny. Will you be the partner who completes the masterpiece?",
    "Enter a realm where confidence knows no bounds and mediocrity is left in the dust. Embrace the extraordinary with me.",
    "I'm the man who ignites the fire within you, a charismatic force that leaves you craving more.",
    "Embark on a journey of passion and power, guided by a man who dares to dream big and live even bigger.",
    "A captivating force of nature, I bring a touch of magic to every moment. Are you ready to be enchanted?",
    "Join me on a voyage of self-discovery and exhilarating romance. Life with me is an experience like no other.",
    "I'm the embodiment of confidence and charm, a gentleman who knows how to treat a partner like royalty.",
    "With an aura of invincibility, I defy limitations and challenge the ordinary. Brace yourself for an extraordinary connection.",
    "Unleash your wild side with a man who lives life on his own terms. Get ready for an adventure you'll never forget."
]


about_sections_initial = [
    "Passionate dancer who finds joy in expressing emotions through movement. Seeking a partner who can dance through life with me.",
    "Tech-savvy gamer who loves exploring virtual worlds and solving puzzles. Looking for a gaming partner to share epic adventures.",
    "Social activist committed to fighting for equality and justice. Seeking a partner who wants to make a positive impact in society.",
    "Adrenaline junkie always in search of thrilling experiences. Looking for someone brave enough to join me on wild escapades.",
    "Vintage car enthusiast with a passion for classic cars. Seeking a partner who appreciates the beauty of these timeless machines.",
    "Self-proclaimed food critic always on the hunt for the perfect bite. Let's embark on gastronomic journeys and discover culinary gems.",
    "Astrology enthusiast intrigued by the cosmic connections. Seeking a partner who shares an interest in the mystical aspects of life.",
    "Passionate gardener with a green thumb. Looking for a partner to create a blooming paradise and cultivate a beautiful relationship.",
    "Yoga practitioner on a journey to find inner peace and balance. Seeking a partner who values mindfulness and holistic well-being."
]



female_names = [
    "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn",
    "Abigail", "Emily", "Elizabeth", "Mila", "Ella", "Avery", "Sofia", "Camila", "Aria", "Scarlett",
    "Victoria", "Madison", "Luna", "Grace", "Chloe", "Penelope", "Layla", "Riley", "Zoey", "Nora",
    "Lily", "Eleanor", "Hannah", "Lillian", "Addison", "Aubrey", "Ellie", "Stella", "Natalie", "Zoe",
    "Leah", "Hazel", "Violet", "Aurora", "Savannah", "Audrey", "Brooklyn", "Bella", "Claire", "Skylar"
]

male_names = [
    "Liam", "Noah", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mason", "Logan",
    "Alexander", "Ethan", "Jacob", "Michael", "Daniel", "Henry", "Jackson", "Sebastian", "Aiden", "Matthew",
    "Samuel", "David", "Joseph", "Carter", "Owen", "Wyatt", "John", "Jack", "Luke", "Jayden",
    "Dylan", "Grayson", "Levi", "Isaac", "Gabriel", "Julian", "Mateo", "Anthony", "Jaxon", "Lincoln",
    "Joshua", "Christopher", "Andrew", "Theodore", "Caleb", "Ryan", "Asher", "Nathan", "Thomas", "Leo"
]

gender_neutral_names = [
    "Alex", "Taylor", "Jordan", "Casey", "Riley", "Sam", "Charlie", "Jamie", "Peyton", "Reese",
    "Dakota", "Avery", "Bailey", "Parker", "Quinn", "Emerson", "Finley", "Harley", "Kai", "Rowan",
    "Sawyer", "Skyler", "Blake", "Hayden", "Morgan", "Phoenix", "River", "Arden", "Elliot", "Frankie",
    "Micah", "Tatum", "Emery", "Remy", "Sage", "Remington", "Marley", "Ashton", "Shay", "Cameron",
    "Kendall", "Drew", "Jesse"
]

states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

looking_for_gender_choices = ["Women", "Men", "Both", "Nonbinary", "Open"]

women = []
random_phone = 5555555555
man_pic_index = 0
woman_pic_index = 0
for name in female_names:
    dob = datetime.strptime(f"{random.randint(1970, 2004)}-10-11", '%Y-%m-%d')
    random_phone += 1
    phone = str(random_phone)
    woman = {
        "flake_score": random.randint(1, 100),
        "first_name": name,
        "email": f"{name.lower()}@email.com",
        "password": "password",
        "date_of_birth": dob.date(),
        "phone": phone,
        "looking_for_gender": random.choice(looking_for_gender_choices),
        "state": random.choice(states),
        "city": f"{random.choice(states)} City",
        "gender": "Woman",
        "about": random.choice(about_sections_women),
        "picture_1": women_images[woman_pic_index]
    }
    woman_pic_index += 1
    women.append(woman)

men = []
for male_name in male_names:
    dob_man = datetime.strptime(f"{random.randint(1970, 2004)}-10-11", '%Y-%m-%d')
    random_phone += 1
    phone_man = str(random_phone)
    man = {
        "flake_score": random.randint(1, 100),
        "first_name": male_name,
        "email": f"{male_name.lower()}@email.com",
        "password": "password",
        "date_of_birth": dob_man.date(),
        "phone": phone_man,
        "looking_for_gender": random.choice(looking_for_gender_choices),
        "state": random.choice(states),
        "city": f"{random.choice(states)} City",
        "gender": "Man",
        "about": random.choice(about_sections_men),
        "picture_1": men_images[man_pic_index]
    }
    man_pic_index += 1
    men.append(man)

people = []
for neutral_name in gender_neutral_names:
    dob_neutral = datetime.strptime(f"{random.randint(1970, 2004)}-10-11", '%Y-%m-%d')
    random_phone += 1
    phone_neutral = str(random_phone)
    person = {
        "flake_score": random.randint(1, 100),
        "first_name": neutral_name,
        "email": f"{neutral_name.lower()}@aa.io",
        "password": "password",
        "date_of_birth": dob_neutral.date(),
        "phone": phone_neutral,
        "looking_for_gender": random.choice(looking_for_gender_choices),
        "state": random.choice(states),
        "city": f"{random.choice(states)} City",
        "gender": "Nonbinary",
        "about": random.choice(about_sections)
    }

    people.append(person)

dob1 = datetime.strptime('1990-11-11', '%Y-%m-%d')
dob2 = datetime.strptime('1991-11-11', '%Y-%m-%d')
dob3 = datetime.strptime('1992-11-11', '%Y-%m-%d')
dob4 = datetime.strptime('1993-11-11', '%Y-%m-%d')
dob5 = datetime.strptime('1994-11-11', '%Y-%m-%d')
dob6 = datetime.strptime('1995-11-11', '%Y-%m-%d')
dob7 = datetime.strptime('1989-11-11', '%Y-%m-%d')
dob8 = datetime.strptime('1989-10-11', '%Y-%m-%d')
dob9 = datetime.strptime('1988-10-11', '%Y-%m-%d')

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        about = about_sections_initial[0], flake_score = 90, first_name='Demo', email='demo@aa.io', password='password', date_of_birth=dob1.date(), phone="1111111111", looking_for_gender="Women", state="California", city="Los Angeles", gender="Man", picture_1="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80")
    marnie = User(
        about = about_sections_initial[1], flake_score = 80, first_name='Marnie', email='marnie@aa.io', password='password', date_of_birth=dob2.date(), phone="2222222222", looking_for_gender="Men", state="New York", city="New York City", gender="Woman", picture_1="https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    bobbie = User(
        about = about_sections_initial[2], flake_score = 95, first_name='Bobbie', email='bobbie@aa.io', password='password', date_of_birth=dob3.date(), phone="3333333333", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80")
    dan = User(
        about = about_sections_initial[3], flake_score = 91, first_name='Dan', email='dan@aa.io', password='password', date_of_birth=dob4.date(), phone="3333333332", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    brad = User(
        about = about_sections_initial[4], flake_score = 100, first_name='Brad', email='brad@aa.io', password='password', date_of_birth=dob5.date(), phone="3333333339", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    donovan = User(
        about = about_sections_initial[5], flake_score = 40, first_name='Donovan', email='donovan@aa.io', password='password', date_of_birth=dob6.date(), phone="3333433339", looking_for_gender="Women", state="New York", city="New York City", gender="Man", picture_1="https://images.unsplash.com/photo-1567784177951-6fa58317e16b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    genevieve = User(
        about = about_sections_initial[6], flake_score = 70, first_name='Genevieve', email='genevieve@aa.io', password='password', date_of_birth=dob7.date(), phone="3333436339", looking_for_gender="Men", state="New York", city="New York City", gender="Woman", picture_1="https://plus.unsplash.com/premium_photo-1679993884184-70033581920b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")
    jared = User(
        about = about_sections_initial[7], flake_score = 92, first_name='Jared', email='jared@aa.io', password='password', date_of_birth=dob8.date(), phone="3333436239", looking_for_gender="Both", state="New York", city="New York City", gender="Nonbinary", picture_1="https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80")
    bonnie = User(
        about = about_sections_initial[8], flake_score = 88, first_name='Bonnie', email='bonnie@aa.io', password='password', date_of_birth=dob9.date(), phone="3433436239", looking_for_gender="Both", state="New York", city="New York City", gender="Woman", picture_1="https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80")


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(dan)
    db.session.add(brad)
    db.session.add(donovan)
    db.session.add(genevieve)
    db.session.add(jared)
    db.session.add(bonnie)
    db.session.commit()

    for woman in women:
        newUser = User(
            picture_1 = woman["picture_1"], flake_score = woman["flake_score"], first_name = woman["first_name"], email = woman["email"], password = woman["password"], date_of_birth = woman["date_of_birth"], phone = woman["phone"], looking_for_gender = woman["looking_for_gender"], state = woman["state"], city = woman["city"], gender = woman["gender"], about = woman["about"]
        )
        db.session.add(newUser)

    db.session.commit()

    for man in men:
        newMaleUser = User(
            picture_1 = man["picture_1"], about = man["about"], flake_score = man["flake_score"], first_name = man["first_name"], email = man["email"], password = man["password"], date_of_birth = man["date_of_birth"], phone = man["phone"], looking_for_gender = man["looking_for_gender"], state = man["state"], city = man["city"], gender = man["gender"]
        )
        db.session.add(newMaleUser)

    db.session.commit()

    for person in people:
        neutralUser = User(
            about = person["about"], flake_score = person["flake_score"], first_name = person["first_name"], email = person["email"], password = person["password"], date_of_birth = person["date_of_birth"], phone = person["phone"], looking_for_gender = person["looking_for_gender"], state = person["state"], city = person["city"], gender = person["gender"]
        )
        db.session.add(neutralUser)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
