import unittest
from unittest.mock import patch
from engine import parse_request,generate_plan,model_status
class TestEngine(unittest.TestCase):
 def test_input(self):
  self.assertEqual(parse_request({"tasks":"a","minutes":30,"energy":"low"})["minutes"],30)
 def test_bad_input(self):
  with self.assertRaises(ValueError):parse_request({"tasks":""})
 def test_bad_budget(self):
  with self.assertRaises(ValueError):parse_request({"tasks":"a","minutes":500})
 def test_no_fake_ai(self):
  with patch("engine.urlopen",side_effect=OSError("offline")):
   with self.assertRaises(RuntimeError):generate_plan({"tasks":"Clean inbox","minutes":60,"energy":"low"})
 def test_missing_ollama_status(self):
  with patch("engine.urlopen",side_effect=OSError("offline")):
   self.assertFalse(model_status()["connected"])
if __name__=="__main__":unittest.main()
